export const verifyInStock = (sizes) => {
    if (Array.isArray(sizes)) {
        return sizes.some(size => size.is_available && size.in_stock > 0);
    }
    return false;
    
}