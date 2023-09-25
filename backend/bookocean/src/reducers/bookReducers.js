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
  BOOK_CREATE_RESET,
  BOOK_UPDATE_REQUEST,
  BOOK_UPDATE_SUCCESS,
  BOOK_UPDATE_FAIL,
  BOOK_UPDATE_RESET,
  BOOK_CREATE_REVIEW_REQUEST,
  BOOK_CREATE_REVIEW_SUCCESS,
  BOOK_CREATE_REVIEW_FAIL,
  BOOK_CREATE_REVIEW_RESET,
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
  BOOK_REQUEST_RESET,
  NOTIFICATION_REQUEST,
  NOTIFICATION_SUCCESS,
  NOTIFICATION_FAIL,

  MARK_NOTIFICATION_SUCCESS,
  MARK_NOTIFICATION_FAIL,
  MARK_NOTIFICATION_REQUEST
} from "../constants/bookConstants";

export const bookListReducer = (state = { books: [] }, action) => {
  switch (action.type) {
    case BOOK_LIST_REQUEST:
      return { loading: true, books: [] };

    case BOOK_LIST_SUCCESS:
      return {
        loading: false,
        books: action.payload.books,
        page: action.payload.page,
        pages: action.payload.pages,
      };

    case BOOK_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const myBookListReducer = (state = { books: [] }, action) => {
  switch (action.type) {
    case MY_BOOK_REQUEST:
      return { loading: true, books: [] };

    case MY_BOOK_SUCCESS:
      return {
        loading: false,
        books: action.payload,
      };

    case MY_BOOK_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const bookRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOK_REQUEST_REQUEST:
      return { loading: true };

    case BOOK_REQUEST_SUCCESS:
      return { loading: false, success: true, book: action.payload };

    case BOOK_REQUEST_FAIL:
      return { loading: false, error: action.payload };

    case BOOK_REQUEST_RESET:
      return {};

    default:
      return state;
  }
};

export const getAllBookRequestsReducer = (state= {books:[] }, action) => {
  switch (action.type) {
    case BOOK_REQUEST_REQUEST:
      return { loading: true, books: [] };

    case BOOK_REQUEST_SUCCESS:
      return { loading: false, success: true, books: action.payload };

    case BOOK_REQUEST_FAIL:
      return { loading: false, error: action.payload };

    case BOOK_REQUEST_RESET:
      return {};

    default:
      return state;
  }
};

export const myRequestBookListReducer = (state = { books: [] }, action) => {
  switch (action.type) {
    case MY_BOOK_REQUEST:
      return { loading: true, books: [] };

    case MY_BOOK_SUCCESS:
      return {
        loading: false,
        books: action.payload,
      };

    case MY_BOOK_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const notificationsListReducer = (
  state = { notifications: [],
            new_notifications:0 },
  action
) => {
  switch (action.type) {
    case NOTIFICATION_REQUEST:
      return { loading: true, notifications: [], new_notifications:0 };

    case NOTIFICATION_SUCCESS:
      return {
        loading: false,
        notifications: action.payload.notifications,
        new_notifications:action.payload.unread_count
      };

    case NOTIFICATION_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const markNotficationsReducer = (
  state = { },
  action
) => {
  switch (action.type) {
    case MARK_NOTIFICATION_REQUEST:
      return { loading: true};

    case MARK_NOTIFICATION_SUCCESS:
      return {
        loading: false,
       
      };
    case MARK_NOTIFICATION_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const authorListReducer = (state = { authors: [] }, action) => {
  switch (action.type) {
    case AUTHOR_LIST_REQUEST:
      return { loading: true, authors: [] };

    case AUTHOR_LIST_SUCCESS:
      return {
        loading: false,
        authors: action.payload,
      };

    case AUTHOR_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const categoryListReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { loading: true, categories: [] };

    case CATEGORY_LIST_SUCCESS:
      return {
        loading: false,
        categories: action.payload,
      };

    case CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const bookDetailsReducer = (
  state = { book: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case BOOK_DETAILS_REQUEST:
      return { loading: true, ...state };

    case BOOK_DETAILS_SUCCESS:
      return { 
        loading: false, 
        book: action.payload.book,
        recommended_books:action.payload.recommended_books };

    case BOOK_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const bookDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOK_DELETE_REQUEST:
      return { loading: true };

    case BOOK_DELETE_SUCCESS:
      return { loading: false, success: true };

    case BOOK_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const bookCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOK_CREATE_REQUEST:
      return { loading: true };

    case BOOK_CREATE_SUCCESS:
      return { loading: false, success: true, book: action.payload };

    case BOOK_CREATE_FAIL:
      return { loading: false, error: action.payload };

    case BOOK_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export const bookUpdateReducer = (state = { book: {} }, action) => {
  switch (action.type) {
    case BOOK_UPDATE_REQUEST:
      return { loading: true };

    case BOOK_UPDATE_SUCCESS:
      return { loading: false, success: true, book: action.payload };

    case BOOK_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    case BOOK_UPDATE_RESET:
      return { book: {} };

    default:
      return state;
  }
};

export const bookTopRatedReducer = (state = { books: [] }, action) => {
  switch (action.type) {
    case BOOK_TOP_REQUEST:
      return { loading: true, books: [] };

    case BOOK_TOP_SUCCESS:
      return { loading: false, books: action.payload };

    case BOOK_TOP_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const bookReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOK_CREATE_REVIEW_REQUEST:
      return { loading: true };

    case BOOK_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };

    case BOOK_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };

    case BOOK_CREATE_REVIEW_RESET:
      return {};

    default:
      return state;
  }
};
