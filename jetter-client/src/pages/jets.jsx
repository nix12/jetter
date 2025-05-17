import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import axios from '../services/axios/axios-forum';

const Jets = () => {
  const [jets, setJets] = useState([]);

  useEffect(() => {
    const fetchJets = async () => {
      const jets = await axios.get('/api/jets');

      setJets(jets.data.jets);
    };

    fetchJets();
  }, []);

  return jets.map(jet => (
    <div key={jet.name}>
      <Link href="/j/[jetId]" as={`j/${jet.name}`}>
        <a>{jet.name}</a>
      </Link>
    </div>
  ));
};

export const getStaticProps = async () => {
  return { props: {} };
};

export default Jets;
