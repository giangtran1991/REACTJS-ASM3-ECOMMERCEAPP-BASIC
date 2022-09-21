export const formatPrice = (price) => {
    return price
        .toString()
        .split("")
        .reverse()
        .reduce((prev, next, index) => {
            return (index % 3 ? next : next + ".") + prev;
        });
};
