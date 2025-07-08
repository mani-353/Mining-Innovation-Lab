
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RiskAssessment = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the new main risk assessment page
    navigate('/products/risk-assessment', { replace: true });
  }, [navigate]);

  return null;
};

export default RiskAssessment;
