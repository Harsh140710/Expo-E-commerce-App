import SafeScreen from '@/components/ui/SafeScreen';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import ProductsGrid from '@/components/ProductsGrid';
import useProducts from '@/hooks/useProducts';

const CATEGORIES = [
    { name: 'All', icon: 'grid-outline' as const },
    { name: "Men's Watches", value: "Men's Watch" , image: require('@/assets/images/man.png') },
    { name: "Woman's Watches", image: require('@/assets/images/woman.png') },
    { name: "Kids Watches", image: require('@/assets/images/woman.png') },
    { name: 'Smart Watch', image: require('@/assets/images/smart-watch.png') },
    { name: 'Sports', image: require('@/assets/images/smart-watch.png') },
    { name: 'Digital', image: require('@/assets/images/smart-watch.png') },
    { name: 'Others', image: require('@/assets/images/fashion.png') },
];

const ShopScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const { data: products, isLoading, isError } = useProducts();

    const filteredProducts = useMemo(() => {
        if (!products) return [];

        let filtered = products;

        // filtering by category
        if (selectedCategory !== 'All') {
            filtered = filtered.filter((product) => product.category === selectedCategory);
        }

        // filtering by search query
        if (searchQuery.trim()) {
            filtered = filtered.filter((product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        return filtered;
    }, [products, selectedCategory, searchQuery]);

    return (
        <SafeScreen>
            <ScrollView
                className="flex-1"
                contentContainerStyle={{
                    paddingBottom: 100,
                }}
                showsVerticalScrollIndicator={false}>
                {/* HEADER */}
                <View className="px-4 pb-4 pt-6">
                    <View className="mb-6 flex-row items-center justify-between">
                        <View>
                            <Text className="text-3xl font-bold">Timeless Elegance</Text>
                            <Text className="mt-1 font-medium text-secondary">
                                Brows all products
                            </Text>
                        </View>

                        <TouchableOpacity
                            className="rounded-full bg-gray-100 p-3"
                            activeOpacity={0.5}>
                            <Ionicons name="options-outline" size={22} />
                        </TouchableOpacity>
                    </View>

                    {/* SEARCH BAR */}
                    <View className="flex-row items-center rounded-2xl bg-gray-100 px-4 py-2">
                        <Ionicons name="search" size={20} color="#666" />
                        <TextInput
                            placeholder="Search the product"
                            placeholderTextColor="#666"
                            className="ml-3 flex-1 text-lg text-black"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>
                </View>

                {/* CATEGORY FILTER COMPONENT */}
                <View className="mb-6">
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingHorizontal: 20,
                        }}>
                        {CATEGORIES.map((category) => {
                            const isSelected = selectedCategory === category.name;
                            return (
                                <TouchableOpacity
                                    key={category.name}
                                    onPress={() => setSelectedCategory(category.name)}
                                    className={`mr-3 size-20 items-center justify-center rounded-2xl bg-gray-100/50 ${isSelected ? 'rounded-2xl border-b-4 border-yellow-500' : 'border-none bg-white text-black'}`}>
                                    {category.icon ? (
                                        <Ionicons
                                            name={category.icon}
                                            size={36}
                                            color={isSelected ? '#121212' : '#111'}
                                        />
                                    ) : (
                                        <Image
                                            source={category.image}
                                            className="size-12"
                                            resizeMode="contain"
                                        />
                                    )}
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>

                {/* PRODUCTS HEAD */}
                <View className="mb-6 px-4">
                    <View className="mb-4 flex-row items-center justify-between">
                        <Text className="text-2xl">Products </Text>
                        <Text className="text-lg">{filteredProducts.length} items </Text>
                    </View>

                    {/* PRODUCT GRID */}
                    <ProductsGrid products={filteredProducts} isLoading={isLoading} isError={isError} />
                </View>
            </ScrollView>
        </SafeScreen>
    );
};

export default ShopScreen;
