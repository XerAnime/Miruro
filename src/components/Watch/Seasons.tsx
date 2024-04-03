import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// Styled Components
const SeasonCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  gap: 20px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  @media (max-width: 500px) {
    justify-content: center;
  }
`;

const SeasonCard = styled.div`
  background-size: cover;
  background-position: center;
  aspect-ratio: 2 / 1;
  width: 8rem;
  position: relative;
  display: flex;
  align-items: left; /* Center children vertically */
  justify-content: left; /* Center children horizontally */
  text-align: center; /* Ensure text is centered */
  padding: 1.3rem;
  border-radius: 1rem;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5); /* Dark overlay */
    border-radius: var(
      --global-border-radius
    ); /* Match parent's border radius */
    z-index: 1;
  }
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 2; /* Ensure content is above the overlay */
`;

const SeasonName = styled.div`
  font-size: 0.9rem;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
`;

const RelationType = styled.div`
  font-size: 1.5rem;
  font-weight: bold;

  color: white;
  border-radius: var(--global-border-radius);
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  margin-bottom: 8px; /* Space between relation type and season name */
`;

interface AnimeRelation {
  id: number;
  malId: number;
  relationType: string;
  title: {
    romaji: string;
    english: string;
    native: string;
    userPreferred: string;
  };
  status: string;
  episodes: number | null;
  image: string;
  imageHash: string;
  cover: string;
  coverHash: string;
  rating: number;
  type: string;
}

interface SeasonsProps {
  relations: AnimeRelation[];
}

const Seasons: React.FC<SeasonsProps> = ({ relations }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle card click
  const handleCardClick = (id: number) => {
    navigate(`/watch/${id}`); // Navigate to the corresponding anime page
  };

  // Sort relations so that PREQUELs come before SEQUELs
  const sortedRelations = relations.sort((a, b) => {
    if (a.relationType === 'PREQUEL' && b.relationType !== 'PREQUEL') {
      return -1; // a comes first
    }
    if (a.relationType !== 'PREQUEL' && b.relationType === 'PREQUEL') {
      return 1; // b comes first
    }
    return 0; // no change in order
  });

  return (
    <SeasonCardContainer>
      {sortedRelations.map((relation) => (
        <SeasonCard
          key={relation.id}
          style={{ backgroundImage: `url(${relation.image})` }}
          onClick={() => handleCardClick(relation.id)} // Add the onClick event handler
        >
          <Content>
            <RelationType>{relation.relationType}</RelationType>
            <SeasonName>{relation.title.userPreferred}</SeasonName>
          </Content>
        </SeasonCard>
      ))}
    </SeasonCardContainer>
  );
};

export default Seasons;
