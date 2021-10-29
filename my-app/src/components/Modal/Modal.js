import { useDispatch } from "react-redux";
import { setModalOpen } from "../../store/products/actions"
import Button from '../Button/Button'
import PropTypes from 'prop-types';
import './Modal.scss'

const Modal = ({ header, actions, className }) => {
  const dispatch = useDispatch()

  const closeModal = () => {
    dispatch(setModalOpen(false))
  }
  return (<>
    <div className={`modal-box ${className}`} data-testid="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{header}</h5>
          <Button
            text={<span className="modal-close-icon">&times;</span >}
            onClick={closeModal}
            type="button" />
        </div>
        <div className="modal-footer">
          {actions}
        </div>
      </div>
    </div>
    <div className="modal-backdrop" onClick={closeModal}></div>
  </>
  )
}

Modal.propTypes = {
  header: PropTypes.string,
  actions: PropTypes.node,
  className: PropTypes.string,
}

Modal.defaultProps = {
  header: "",
  actions: null,
  className: ""
}

export default Modal