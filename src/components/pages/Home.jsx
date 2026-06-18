import { Link } from 'react-router';
import { useGetCategoryProductsQuery } from '../../services/catalogApi'
import ProductCard from '../common/ProductCard';
import ProductCardSkeleton from '../common/ProductCardSkeleton';

export default function Home() {
    const apparelCatId = import.meta.env.VITE_APPAREL_CATEGORY_ID;
    const accessoriesCatId = import.meta.env.VITE_ACCESSORIES_CATEGORY_ID;
    const watchedCatId = import.meta.env.VITE_WATCHES_CATEGORY_ID;
    const { data, isLoading, isError } = useGetCategoryProductsQuery({ categoryId: 4, pageSize: 4, currentPage: 1 })
    const products = data?.products?.items || []
    return (
        <>
            {/* 3. HERO SHOWCASE SECTION */}
            <section className="relative bg-gray-900 overflow-hidden">
                {/* Background Image Template Placement */}
                <div className="max-sm:w-full max-sm:aspect-video absolute inset-0 opacity-40">
                    <img
                        src="/images/home-main.jpg"
                        alt="New Collection Background"
                        className="h-full w-full object-cover object-center"
                    />
                </div>
                <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
                    <div className="max-w-2xl text-left">
                        <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
                            Summer Drop 2026
                        </span>
                        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
                            Elevate Your Everyday Essentials
                        </h1>
                        <p className="mt-6 text-xl text-gray-300 max-w-xl">
                            Discover a curated selection of minimalist clothing, premium
                            accessories, and dynamic gear engineered for modern life.
                        </p>
                        <div className="mt-10 flex items-center gap-x-6">
                            <Link to="/shop" className="rounded-md bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition">
                                Shop New Arrivals
                            </Link>

                            <Link to="/shop" className="text-base font-semibold text-white hover:text-gray-300 transition">
                                Browse Collections <span aria-hidden="true">→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            {/* 4. FEATURED CATEGORIES SECTION */}
            <main className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-2 py-10">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                        Shop by Category
                    </h2>
                    <Link to="/shop" className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block">
                        Browse all categories <span aria-hidden="true"> →</span>
                    </Link>
                </div>
                {/* Category Grid */}
                <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-6 lg:gap-x-8">
                    {/* Category 1 */}
                    <div className="group relative h-96 w-full overflow-hidden rounded-lg bg-white shadow sm:aspect-h-3 sm:aspect-w-2 lg:aspect-h-4 lg:aspect-w-3">
                        <img
                            src="/images/home-pants.jpg"
                            alt="Apparel Category"
                            className="h-full w-full object-cover object-center group-hover:scale-105 transition duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-6">
                            <h3 className="text-xl font-bold text-white">Apparel</h3>
                            <p className="mt-1 text-sm text-gray-300">Premium everyday wear</p>
                        </div>
                        <Link to={`/shop/id/${apparelCatId}`} className="absolute inset-0"></Link>
                    </div>
                    {/* Category 2 */}
                    <div className="group relative h-96 w-full overflow-hidden rounded-lg bg-white shadow">
                        <img
                            src="/images/accessories.jpg"
                            alt="Accessories Category"
                            className="h-full w-full object-cover object-center group-hover:scale-105 transition duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-6">
                            <h3 className="text-xl font-bold text-white">Accessories</h3>
                            <p className="mt-1 text-sm text-gray-300">
                                Bags and wallets
                            </p>
                        </div>
                        <Link to={`/shop/id/${accessoriesCatId}`} className="absolute inset-0"></Link>
                    </div>
                    {/* Category 3 */}
                    <div className="group relative h-96 w-full overflow-hidden rounded-lg bg-white shadow">

                        <img
                            src="/images/watches.jpg"
                            alt="Footwear Category"
                            className="h-full w-full object-cover object-center group-hover:scale-105 transition duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-6">
                            <h3 className="text-xl font-bold text-white">Watches</h3>
                            <p className="mt-1 text-sm text-gray-300">Premium watches collection</p>
                        </div>
                        <Link to={`/shop/id/${watchedCatId}`} className="absolute inset-0"></Link>
                    </div>
                </div>
            </main>
            {/* 5. TRENDING PRODUCTS GRID */}
            <section className="max-w-[1320px] py-5 mx-auto bg-white border-t border-gray-200">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                    Trending Products
                </h2>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-5 mt-5 px-3'>
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
                                    <p> No Items found!..</p>
                                )
                            )
                        )}
                </div>
            </section>
        </>

    )
}
