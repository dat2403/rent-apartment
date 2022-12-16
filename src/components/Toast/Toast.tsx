import React from 'react';
import { useState, useEffect } from 'react';
import './Toast.css';
interface ToastProps {
  toastList: any[];
  position: string;
  autoDelete: boolean;
  autoDeleteTime: number;
  description: string;
}
const defaultProps: ToastProps = {
  autoDeleteTime: 3000,
  position: 'top-right',
  toastList: [],
  autoDelete: false,
  description: '',
};

const Toast: React.FunctionComponent<ToastProps> = (props) => {
  const { toastList, autoDelete, autoDeleteTime, position, description } =
    props;
  const [list, setList] = useState(toastList);

  useEffect(() => {
    setList([...toastList]);
  }, [toastList]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoDelete && toastList.length && list.length) {
        deleteToast(toastList[0].id);
      }
    }, autoDeleteTime);

    return () => {
      clearInterval(interval);
    };

    // eslint-disable-next-line
  }, [toastList, autoDelete, autoDeleteTime, list]);

  const deleteToast = (id: number) => {
    const listItemIndex = list.findIndex((e) => e.id === id);
    const toastListItem = toastList.findIndex((e) => e.id === id);
    list.splice(listItemIndex, 1);
    toastList.splice(toastListItem, 1);
    setList([...list]);
  };

  return (
    <>
      <div className={`notification-container ${position}`}>
        {list.map((toast, i) => (
          <div
            key={i}
            className={`notification toast ${position}`}
            // style={{ backgroundColor: toast.backgroundColor! }}
          >
            <button onClick={() => deleteToast(toast?.id)}>X</button>
            <div className="notification-image">
              <img src={toast?.icon} alt="" />
            </div>
            <div>
              <p className="notification-title">{toast?.title}</p>
              <p className="notification-message">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
Toast.defaultProps = defaultProps;

export default Toast;
