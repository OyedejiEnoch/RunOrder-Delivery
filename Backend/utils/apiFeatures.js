class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            //to make us use small letters in searching "i" makes it not case sensitive,  
            //while regex brings out all productwith a single letter name
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        } : {}

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {

        const queryCopy = { ... this.queryStr }


        //removing fields from the query
        const removeFields = ["keyword", "limit", "page"]
        removeFields.forEach(el => delete queryCopy[el])

        //advanced filter for price ratings

        let queryStr = JSON.stringify(queryCopy)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)

        this.query = this.query.find(JSON.parse(queryStr))
        return this;
    }

    pagination(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage - 1)
        //allows to read products to show on page e.g first 10 on first page then 11-20 second page and so on

        this.query = this.query.limit(resPerPage).skip(skip)
        //limit means we want to limit thr number of document that will be returned, i.e to  4, then .skip will process the next page
        return this

    }

}

module.exports = APIFeatures