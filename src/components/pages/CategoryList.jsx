import { useParams } from 'react-router';
import { useGetCategoryProductsQuery } from '../../services/catalogApi'
import ProductCard from '../common/ProductCard';
import ProductCardSkeleton from '../common/ProductCardSkeleton';

export default function CategoryList() {
    const { id } = useParams();
    const categoryId = id || '6';
    const { data, isLoading, isError } = useGetCategoryProductsQuery({ categoryId, pageSize: 12, currentPage: 1 })
    const products = data?.products?.items || []
    return (
        <section className='py-5'>
            <h1 className='text-3xl text-center font-bold'>Our Products</h1>
            <div className='max-w-[1320px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-5 mt-5 px-2'>
                {isLoading ?
                    Array(8)
                        .fill(0)
                        .map((_, index) => (
                            <ProductCardSkeleton key={index} />
                        ))
                    : (
                        (
                            products.length > 0 ? (
                                products.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))
                            ) : (
                                <p class="text-center"> No Items found!..</p>
                            )
                        )
                    )}
            </div>
        </section>
    )
}
