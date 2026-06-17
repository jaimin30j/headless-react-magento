import React from 'react';
import Skeleton from 'react-loading-skeleton';

const ProductCardSkeleton = () => {
    return (
        <div className="product-card" style={{ border: '1px solid #eee', padding: '16px', borderRadius: '8px' }}>
            {/* Product Image Placeholder */}
            <Skeleton height={200} borderRadius={8} style={{ marginBottom: '12px' }} />

            {/* Product Title Placeholder (1 line) */}
            <Skeleton height={24} width="80%" style={{ marginBottom: '8px' }} />

            {/* Product Description Placeholder (2 lines) */}
            <Skeleton count={2} height={14} style={{ marginBottom: '12px' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Product Price Placeholder */}
                <Skeleton width={60} height={20} />
                {/* Buy Button Placeholder */}
                <Skeleton width={80} height={32} borderRadius={4} />
            </div>
        </div>
    );
};

export default ProductCardSkeleton;
