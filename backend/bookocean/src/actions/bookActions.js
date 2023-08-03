import axios from "axios";
import {
  BOOK_LIST_REQUEST,
  BOOK_LIST_SUCCESS,
  BOOK_LIST_FAIL,
  BOOK_DETAILS_REQUEST,
  BOOK_DETAILS_SUCCESS,
  BOOK_DETAILS_FAIL,
  BOOK_DELETE_REQUEST,
  BOOK_DELETE_SUCCESS,
  BOOK_DELETE_FAIL,
  BOOK_CREATE_REQUEST,
  BOOK_CREATE_SUCCESS,
  BOOK_CREATE_FAIL,
  BOOK_UPDATE_REQUEST,
  BOOK_UPDATE_SUCCESS,
  BOOK_UPDATE_FAIL,
  BOOK_CREATE_REVIEW_REQUEST,
  BOOK_CREATE_REVIEW_SUCCESS,
  BOOK_CREATE_REVIEW_FAIL,
  BOOK_TOP_REQUEST,
  BOOK_TOP_SUCCESS,
  BOOK_TOP_FAIL,
  AUTHOR_LIST_REQUEST,
  AUTHOR_LIST_SUCCESS,
  AUTHOR_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  MY_BOOK_REQUEST,
  MY_BOOK_SUCCESS,
  MY_BOOK_FAIL,
  BOOK_REQUEST_REQUEST,
  BOOK_REQUEST_SUCCESS,
  BOOK_REQUEST_FAIL,
  NOTIFICATION_REQUEST,
  NOTIFICATION_SUCCESS,
  NOTIFICATION_FAIL,
  MARK_NOTIFICATION_SUCCESS,
  MARK_NOTIFICATION_FAIL,
  MARK_NOTIFICATION_REQUEST
} from "../constants/bookConstants";

export const listBooks =
  (keyword = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: BOOK_LIST_REQUEST });

      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/books/${keyword}`
      );

      dispatch({
        type: BOOK_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: BOOK_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const mybooks = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: MY_BOOK_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/books/my/books/`,
      config
    );

    dispatch({
      type: MY_BOOK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MY_BOOK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const requestBook = (bookData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOK_REQUEST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `http://127.0.0.1:8000/api/books/request/`,
      bookData,
      config
    );

    dispatch({
      type: BOOK_REQUEST_SUCCESS,
      payload: data,
    });
    dispatch(getnotificationList())

  } catch (error) {
    dispatch({
      type: BOOK_REQUEST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getnotificationList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: NOTIFICATION_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/books/notifications/`,
      config
    );

    dispatch({
      type: NOTIFICATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NOTIFICATION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const markNotfications = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: MARK_NOTIFICATION_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/books/markAsRead/`,
      config
    );

    dispatch({
      type: MARK_NOTIFICATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MARK_NOTIFICATION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const myRequestBooks = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: MY_BOOK_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/books/my/requests/`,
      config
    );

    dispatch({
      type: MY_BOOK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MY_BOOK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailBook = (id) => async (dispatch) => {
  try {
    dispatch({
      type: BOOK_DETAILS_REQUEST,
    });

    const { data } = await axios.get(`http://127.0.0.1:8000/api/books/${id}/`);

    dispatch({
      type: BOOK_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOOK_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createBookReview = (id, review) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOK_CREATE_REVIEW_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `http://127.0.0.1:8000/api/books/${id}/reviews/`,
      review,
      config
    );
    dispatch({
      type: BOOK_CREATE_REVIEW_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOOK_CREATE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listTopBooks = () => async (dispatch) => {
  try {
    dispatch({ type: BOOK_TOP_REQUEST });

    const { data } = await axios.get(`http://127.0.0.1:8000//api/books/top/`);

    dispatch({
      type: BOOK_TOP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOOK_TOP_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const createBook = (bookData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOK_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `http://127.0.0.1:8000/api/books/create/`,
      bookData,
      config
    );

    dispatch({
      type: BOOK_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOOK_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateBook = (book) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOK_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `http://127.0.0.1:8000/api/books/update/${book._id}/`,
      book,
      config
    );

    dispatch({
      type: BOOK_UPDATE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: BOOK_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOOK_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleteBook = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOK_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`http://127.0.0.1:8000/api/books/delete/${id}/`, config);

    dispatch({
      type: BOOK_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: BOOK_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const authorList = () => async (dispatch) => {
  try {
    dispatch({ type: AUTHOR_LIST_REQUEST });

    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/books/author/all/`
    );

    dispatch({
      type: AUTHOR_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: AUTHOR_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const categoryList = () => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_LIST_REQUEST });

    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/books/category/all/`
    );

    dispatch({
      type: CATEGORY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
