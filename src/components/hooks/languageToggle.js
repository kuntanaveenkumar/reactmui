import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const toggleLanguage = () => {
    const currentLang = localStorage.getItem("defaultlang");
    const newLang = currentLang === "en" ? "fr" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("defaultlang", newLang);
  };
  return (
    <div>
      {localStorage.getItem("defaultlang") === "en" ? (
        <Link onClick={toggleLanguage}>FR</Link>
      ) : (
        <Link onClick={toggleLanguage}>EN</Link>
      )}
    </div>
  );
};

export default LanguageToggle;
