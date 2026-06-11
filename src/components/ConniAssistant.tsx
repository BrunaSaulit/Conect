import React from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import ConniButton from './ConniButton';
import ConniChat from './ConniChat';

export default function ConniAssistant() {
  const { currentPage } = useNavigation();

  // don't show on landing or login
  if (currentPage === 'landing' || currentPage === 'login') return null;

  return (
    <>
      <ConniButton />
      <ConniChat />
    </>
  );
}
