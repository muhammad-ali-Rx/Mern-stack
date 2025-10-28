    import React, { useState } from 'react';
    import axios from 'axios';

    const AddProductForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        discountPercentage: '',
        rating: 0,
        stock: '',
        brand: '',
        category: '',
        image: null,  // Single image
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);  // Add this line

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
        setFormData((prevData) => ({
            ...prevData,
            [name]: files[0] // Only take the first file
        }));
        } else {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);  // Now this works because setLoading is defined
    
        // Validation
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
        if (!formData.brand.trim()) newErrors.brand = 'Brand is required';
        if (!formData.category.trim()) newErrors.category = 'Category is required';
        if (!formData.image) newErrors.image = 'Image is required';  // Adjusted for single image
    
        if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setLoading(false);  // Reset loading state on error
        return;
        }
    
        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('discountPercentage', formData.discountPercentage || 0);
        data.append('rating', formData.rating || 0);
        data.append('stock', formData.stock || 0);
        data.append('brand', formData.brand);
        data.append('category', formData.category);
    
        // Append single image (not an array)
        if (formData.image) {
        data.append('image', formData.image); // Single image instead of array
        }
    
        try {
        const response = await axios.post('http://localhost:3000/addimg', data, {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        });
        
        alert('Product added successfully!');
        
        // Reset form
        setFormData({
            title: '',
            description: '',
            price: '',
            discountPercentage: '',
            rating: 0,
            stock: '',
            brand: '',
            category: '',
            images: null,  // Reset image
        });
    
        // Reset file input
        const fileInput = document.getElementById('images');
        if (fileInput) fileInput.value = '';  // Clear file input
    
        } catch (err) {
        console.error('Error details:', err.response?.data);
        alert('Error adding product: ' + (err.response?.data?.message || 'Unknown error'));
        } finally {
        setLoading(false);  // Reset loading state after request
        }
    };
    
    return (
        <div className="container mt-5">
        <h2 className="text-center mb-4">Add Product</h2>
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
            <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="form-control"
                required
            />
            {errors.title && <div className="text-danger">{errors.title}</div>}
            </div>

            <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-control"
            />
            </div>

            <div className="mb-3">
            <label htmlFor="price" className="form-label">Price</label>
            <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="form-control"
                required
            />
            {errors.price && <div className="text-danger">{errors.price}</div>}
            </div>

            <div className="mb-3">
            <label htmlFor="discountPercentage" className="form-label">Discount Percentage</label>
            <input
                type="number"
                id="discountPercentage"
                name="discountPercentage"
                value={formData.discountPercentage}
                onChange={handleChange}
                className="form-control"
                required
            />
            {errors.discountPercentage && <div className="text-danger">{errors.discountPercentage}</div>}
            </div>

            <div className="mb-3">
            <label htmlFor="rating" className="form-label">Rating</label>
            <input
                type="number"
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="form-control"
                min="0"
                max="5"
            />
            </div>

            <div className="mb-3">
            <label htmlFor="stock" className="form-label">Stock</label>
            <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="form-control"
            />
            </div>

            <div className="mb-3">
            <label htmlFor="brand" className="form-label">Brand</label>
            <input
                type="text"
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="form-control"
                required
            />
            {errors.brand && <div className="text-danger">{errors.brand}</div>}
            </div>

            <div className="mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="form-control"
                required
            />
            {errors.category && <div className="text-danger">{errors.category}</div>}
            </div>

            <div className="mb-3">
            <label htmlFor="image" className="form-label">Image</label>
            <input
                type="file"
                id="image"
                name="image"
                onChange={handleChange}
                className="form-control"
                required
            />
            {errors.image && <div className="text-danger">{errors.image}</div>}
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Adding...' : 'Add Product'}
            </button>
        </form>
        </div>
    );
    };

    export default AddProductForm;
