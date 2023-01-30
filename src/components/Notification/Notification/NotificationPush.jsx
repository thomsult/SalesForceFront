import PropTypes from "prop-types";
import { Dialog } from "@headlessui/react";

/**
 * Represents a book.
 * @constructor
 * @param {string} onClose - function on close.
 * @param {string} data - { Headers, Icon, Message, color, times }
 */
export default function NotificationPush({ onClose, data }) {
  const { Headers, Icon, Message, color, times } = data;
  return (
    <Dialog.Panel
      style={{ "--progressTime": `${times || 2}s` }}
      className="w-screen h-screen  relative "
    >
      <div className="bg-white fixed bottom-40 right-8 max-w-sm  min-w-[20em] shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
        <div className="p-4">
          <div className="flex items-start ">
            <div className="flex-shrink-0">
              {Icon && (
                <Icon className={`h-6 w-6 ${color}`} aria-hidden="true" />
              )}
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                {Headers && Headers}
              </Dialog.Title>
              <div className="mt-1 text-sm text-gray-500">
                {Message && Message}
              </div>
            </div>
          </div>
        </div>
        <div className="h-2 w-full overflow-hidden mx-auto bg-slate-300 progress-bar">
          <div
            onAnimationEnd={() => onClose({ push: true })}
            className="bg-white"
          />
        </div>
      </div>
    </Dialog.Panel>
  );
}
NotificationPush.defaultProps = {
  onClose: () => {},
  data: {},
};
NotificationPush.propTypes = {
  onClose: PropTypes.func,
  data: PropTypes.shape(),
};
