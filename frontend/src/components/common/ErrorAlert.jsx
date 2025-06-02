import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

/**
 * Composant d'alerte d'erreur réutilisable
 * @param {string} message - Le message d'erreur à afficher
 * @param {string} type - Le type d'erreur (error, warning, info)
 */
const ErrorAlert = ({ message, type = "error" }) => {
  if (!message) return null;

  const styles = {
    error: "bg-red-50 border-red-200 text-red-600",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-600",
    info: "bg-blue-50 border-blue-200 text-blue-600",
  };

  return (
    <div
      className={`mt-4 p-4 rounded-lg border ${styles[type]} flex items-center justify-center shadow-sm`}
    >
      <FaExclamationTriangle className="mr-2" />
      <span className="font-medium">{message}</span>
    </div>
  );
};

export default ErrorAlert;
