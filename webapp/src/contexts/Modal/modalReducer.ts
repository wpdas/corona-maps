import {
  ModalState,
  ModalReducer,
  HIDE_MODAL_ACTION,
  HideModalPayload,
  SHOW_CONFIRMATION_MODAL_ACTION,
  ShowConfirmationModalPayload,
} from './modalTypes';

export const initialState: ModalState = {
  show: false,
  title: 'Title',
  description: 'Description',
  confirmButtonText: 'Yes',
  cancelButtonText: 'No',
  showCancelButton: false,
  onClickConfirm: () => {},
};

const hideModalCase = (
  state: ModalState,
  payload: HideModalPayload,
): ModalState => {
  const { show } = payload;
  return {
    ...state,
    show,
  };
};

const showConfirmationwModalCase = (
  state: ModalState,
  payload: ShowConfirmationModalPayload,
): ModalState => {
  const {
    show,
    title,
    description,
    confirmButtonText,
    cancelButtonText,
    showCancelButton,
    onClickConfirm,
    onClickCancel,
  } = payload;
  return {
    ...state,
    show,
    title,
    description,
    confirmButtonText,
    cancelButtonText,
    showCancelButton,
    onClickConfirm,
    onClickCancel,
  };
};

const modalReducer: ModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case HIDE_MODAL_ACTION:
      return hideModalCase(state, action.payload);
    case SHOW_CONFIRMATION_MODAL_ACTION:
      return showConfirmationwModalCase(state, action.payload);
    default:
      return state;
  }
};

export default modalReducer;
