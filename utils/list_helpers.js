const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    if(blogs.length < 1) {
        return 0;
    }
    return blogs.reduce((acc, unit) => {
        return acc + unit.likes;
    }, 0)
}

const favoriteBlog = (blogs) => {
    if(blogs.length < 1) return 0;
    //get the highestLikes
    const highestLikes = Math.max(...blogs.map(unit => unit.likes));
    return blogs.filter((unit) => unit.likes == highestLikes)[0]
}

module.exports = { dummy, totalLikes, favoriteBlog }