import Category from "../model/Category.js";





export const addCategory = async (req, res) => {
    try {

        const { name, parentCategory } = req.body;

        if(parentCategory == ""){
            const category = new Category({ name });
        await category.save();
        res.status(201).json(category);
        }else{

            const category = new Category({ name, parentCategory });
            await category.save();
            res.status(201).json(category);
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

 const createCategories = (categories,parentCategory = null)=>{

    const categoryList = [];
    let category;

   

    if(parentCategory == null){
      category =  categories.filter(cat => cat.parentCategory == undefined)
      console.log(category,"if categorykdnkdnvk")
    }else{
        category = categories.filter(cat => cat.parentCategory == parentCategory);
    }

    for(let cats of category ){
        categoryList.push({

            _id: cats._id,
            name:cats.name,
            children: createCategories(categories, cats._id)

        })
    }

    return categoryList

 }

 export const getCategory = async (req, res) => {
    try {
        const allCategory = await Category.find();
        if (allCategory) {
            const categoryList = createCategories(allCategory);
           
            res.status(200).json(categoryList);
        } else {
            res.status(404).json({ error: 'No categories found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


export const getAllCategory = async (req, res) => {
    try {
        const allCategory = await Category.find()

      
        if (allCategory) {

           
            res.status(201).json(allCategory);
        }



    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}




