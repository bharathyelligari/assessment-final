import { call, put, takeLatest } from "redux-saga/effects";
import { fetchProductsSuccess, fetchProductsFailure, fetchProductDetailsSuccess, fetchProductDetailsFailure, FETCH_PRODUCT_DETAILS_REQUEST, FETCH_PRODUCTS_REQUEST } from "../actions/productActions";
import api from "../auth/axiosInstance";

const fetchProductsApi = async (payload) => {
  const { sort, order } = payload.payload;
  const response = await api.get(`/products?sort=${sort}&order=${order}`); // Replace with your API
  return response.data;
};

const fetchProductDetailsApi = async (id) => {
  const response = await api.get(`/products/` + id.payload); // Replace with your API
  return response.data;
};


function* fetchProducts(payload) {
  try {
    const data = yield call(fetchProductsApi, payload);
    yield put(fetchProductsSuccess(data)); // Store products in Redux
  } catch (error) {
    yield put(fetchProductsFailure(error.message || "Failed to load products"));
  }
}


function* fetchProductDetails(id) {
  try {
    const data = yield call(fetchProductDetailsApi, id);
    yield put(fetchProductDetailsSuccess(data)); // Store products in Redux
  } catch (error) {
    yield put(fetchProductDetailsFailure(error.message || "Failed to load products"));
  }
}

export function* watchFetchProducts() {
  yield takeLatest(FETCH_PRODUCTS_REQUEST, fetchProducts);
  yield takeLatest(FETCH_PRODUCT_DETAILS_REQUEST, fetchProductDetails);
}
