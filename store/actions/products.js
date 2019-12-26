export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

import { callApi } from '../../axios';


export const fetchProducts = () => {
  return dispatch => {
    console.log('get products api called');
      callApi('getAllProducts', null, null, async (error, response, status) => {
          if(status === 200) {
            let loadedProducts = response.products;
            for (let i = 0; i < loadedProducts.length; i++) {
              callApi('findBrandById', null, { brandId: loadedProducts[i].brandId }, (error, response, status) => {
                if (status === 200) {
                  loadedProducts[i]['brandName'] = response.brand.name;
                  if (loadedProducts.length === i + 1) {
                    dispatch({ type: SET_PRODUCTS, products: loadedProducts });
                  }
                }
              });
            }
          }
      });
  }
};

export const deleteProduct = productId => {
  return { type: DELETE_PRODUCT, pid: productId };
};

export const createProduct = (title, description, imageUrl, price) => {
  return {
    type: CREATE_PRODUCT,
    productData: {
      title,
      description,
      imageUrl,
      price
    }
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return {
    type: UPDATE_PRODUCT,
    pid: id,
    productData: {
      title,
      description,
      imageUrl,
    }
  };
};
