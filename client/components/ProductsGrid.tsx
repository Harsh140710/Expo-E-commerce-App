import useWishlist from '@/hooks/useWishlist';
import { Product } from '@/types';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import useCart from '@/hooks/useCart';

interface ProductsGridProps {
    isLoading: boolean;
    isError: boolean;
    products: Product[];
}

const ProductsGrid = ({ products, isLoading, isError }: ProductsGridProps) => {
    const { isInWishlist, toggleWishlist, isAddingToWishlist, isRemovingFromWishlist } =
        useWishlist();
    const { addToCart, isAddingToCart } = useCart();

    const handleAddToCart = (productId: string, productName: string) => {
        addToCart(
            { productId, quantity: 1 },
            {
                onSuccess: () => {
                    Alert.alert('Success', `${productName} added to cart!`);
                },
                onError: (error: any) => {
                    Alert.alert('Error', error?.response?.data?.error || 'Failed to add to cart');
                },
            }
        );
    };

    const renderProducts = ({ item: product }: { item: Product }) => {
        return (
            <TouchableOpacity
                className="mb-3 overflow-hidden rounded-3xl bg-gray-50 shadow"
                style={{ width: '48%' }}
                activeOpacity={0.8}
                // onPress={() => router.push(`/product/${product._id}`)}
            >
                <View className="relative">
                    <Image
                        source={{ uri: product.images[0] }}
                        className="h-44 w-full bg-white"
                        resizeMode="cover"
                    />

                    <TouchableOpacity
                        className="absolute right-3 top-3 rounded-full bg-transparent border p-2 backdrop-blur-xl"
                        activeOpacity={0.7}
                        onPress={() => toggleWishlist(product._id)}
                        disabled={isAddingToWishlist || isRemovingFromWishlist}>
                        {isAddingToWishlist || isRemovingFromWishlist ? (
                            <ActivityIndicator size="small" color="#ffffff" />
                        ) : (
                            <Ionicons
                                name={isInWishlist(product._id) ? 'heart' : 'heart-outline'}
                                size={18}
                                color={isInWishlist(product._id) ? '#FF6B6B' : 'FFFFFF'}
                            />
                        )}
                    </TouchableOpacity>
                </View>

                <View className="p-3">
                    <Text className="mb-1 text-sm text-gray-900">{product.category}</Text>
                    <Text className="mb-2 text-xl font-bold text-gray-950" numberOfLines={2}>
                        {product.name}
                    </Text>

                    <View className="mb-2 flex-row items-center">
                        <Ionicons name="star" size={12} color="#FFC107" />
                        <Text className="ml-1 text-sm font-semibold text-gray-700">
                            {product.averageRating.toFixed(1)}
                        </Text>
                        <Text className="text-gray-700">({product.totalReviews}) </Text>
                    </View>

                    <View className="flex-row items-center justify-between">
                        <Text className="text-lg font-bold text-black">
                            ${product.price.toFixed(2)}
                        </Text>
                        <TouchableOpacity
                            className="h-8 w-8 items-center justify-center rounded-full border"
                            activeOpacity={0.7}
                            onPress={() => handleAddToCart(product._id, product.name)}
                            disabled={isAddingToCart}>
                            {isAddingToCart ? (
                                <ActivityIndicator size="small" color="#121212" />
                            ) : (
                                <Ionicons name="add" size={18} color="#121212" />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    if (isLoading) {
        return (
            <View className="items-center justify-center py-20">
                <ActivityIndicator size="large" color="#000" />
                <Text className="text-primary">Loading products...</Text>
            </View>
        );
    }

    if (isError) {
        return (
            <View className="items-center justify-center py-20">
                <Ionicons name="alert-circle-outline" size={48} color="#FF6B6B" />
                <Text className="mt-4 font-bold text-primary">Failed to load products</Text>
                <Text className="mt-2 text-sm text-primary">Please try again later</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={products}
            renderItem={renderProducts}
            keyExtractor={(item) => item._id}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            ListEmptyComponent={NoProductsFound}
        />
    );
};

export default ProductsGrid;

function NoProductsFound() {
    return (
        <View className="items-center justify-center py-20">
            <Ionicons name="search-outline" size={48} color="#666" />
            <Text className="mt-4 font-semibold text-gray-500">No products found</Text>
            <Text className="mt-4 text-sm text-gray-400">Try adjusting your filters h</Text>
        </View>
    );
}
