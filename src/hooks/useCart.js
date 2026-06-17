import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import toast from 'react-hot-toast'
import { selectCartId, setCartId, openDrawer } from '../features/cartSlice'
import {
    useCreateCartMutation, useGetCartQuery,
    useAddToCartMutation, useUpdateItemMutation, useRemoveItemMutation, useClearCartMutation,
} from '../services/cartApi'

export function useCart() {
    const dispatch = useDispatch()
    const cartId = useSelector(selectCartId)
    const [createCart] = useCreateCartMutation()
    const [addToCart, { isLoading: isAdding }] = useAddToCartMutation()
    const [updateItem, { isLoading: isUpdating }] = useUpdateItemMutation()
    const [removeItem, { isLoading: isRemoving }] = useRemoveItemMutation()
    const [clearCartMutation] = useClearCartMutation()
    const { data, isLoading: cartLoading, isError } = useGetCartQuery(cartId, {
        skip: !cartId,
    })
    const cart = data?.cart
    const items = cart?.items || []
    const itemCount = cart?.total_quantity || 0
    const subtotal = cart?.prices?.subtotal_excluding_tax
    const grandTotal = cart?.prices?.grand_total

    const getOrCreateId = useCallback(async () => {
        if (cartId) return cartId
        const res = await createCart()
        const id = res.data.createEmptyCart
        dispatch(setCartId(id))
        return id
    }, [cartId, createCart, dispatch])

    const addItem = useCallback(async (sku, qty = 1) => {
        const id = await getOrCreateId()
        const res = await addToCart({ cartId: id, sku, qty })
        const err = res.data?.addProductsToCart?.user_errors?.[0]?.message
        if (err) toast.error(err)
        else { toast.success('Added to cart'); dispatch(openDrawer()) }
    }, [getOrCreateId, addToCart, dispatch])

    const updateQty = useCallback(async (uid, qty) => {
        if (qty < 1) return                          // guard: don't allow 0
        await updateItem({ cartId, uid, qty })
    }, [cartId, updateItem])

    const removeOne = useCallback(async (uid) => {
        await removeItem({ cartId, uid })
        toast.success('Item removed')
    }, [cartId, removeItem])

    const emptyCart = useCallback(async () => {
        if (!items.length) return
        await clearCartMutation({ cartId, items })
        dispatch(clearCartId())                      // wipes localStorage too
        toast.success('Cart cleared')
    }, [cartId, items, clearCartMutation, dispatch])

    return {
        cart,
        items,
        itemCount,
        subtotal,
        grandTotal,
        cartLoading,
        isError,
        isAdding,
        isUpdating,
        isRemoving,
        addItem,
        updateQty,
        removeOne,
        emptyCart,
    }
}