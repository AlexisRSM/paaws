import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import FilterSection from '../components/FilterSection';
import AnimalCard from '../components/RegularCard';
import { useAPI } from '../pages/Context/Context';

function AnimalSearch() {
    const { listAnimals } = useAPI();
    const [animals, setAnimals] = useState([]);
    const [filteredAnimals, setFilteredAnimals] = useState([]);
    const [filters, setFilters] = useState({
        species: {},
        gender: {},
        life_stage: {},
        known_illness: {},
        location: '',
    });
    const [sortOption, setSortOption] = useState('name');
    const [loading, setLoading] = useState(true); // Add loading state

    // Fetch animals on component mount
    useEffect(() => {
        const fetchAnimals = async () => {
            try {
                const animalData = await listAnimals();
                console.log(animalData);
                const normalizedData = animalData.map(animal => ({
                    ...animal,
                }));
                setAnimals(normalizedData);
                setFilteredAnimals(normalizedData); // Initialize with all animals
                setLoading(false); // Set loading to false once data is fetched
            } catch (error) {
                console.error('Failed to fetch animals:', error);
                setLoading(false); // Set loading to false even if there is an error
            }
        };
        fetchAnimals();
    }, [listAnimals]);

    // Apply filters and sorting
    useEffect(() => {
        let result = animals;

        // Apply species filter 
        if (Object.values(filters.species).some(Boolean)) {
            result = result.filter(animal => filters.species[animal.species]);
        }

        // Apply gender filter
        if (Object.values(filters.gender).some(Boolean)) {
            result = result.filter(animal => filters.gender[animal.gender]);
        }

        // Apply life stage filter
        if (Object.values(filters.life_stage).some(Boolean)) {
            result = result.filter(animal => filters.life_stage[animal.life_stage]);
        }

        // Apply known illness filter
        if (Object.values(filters.known_illness).some(Boolean)) {
            result = result.filter(animal => filters.known_illness[animal.known_illness]);
        }

        // Apply location filter
        if (filters.location) {
            result = result.filter(animal => animal.location.trim().toLowerCase() === filters.location.toLowerCase());
        }

        // Simple scalable way to not mess up sort by :D 
        const lifeStageOrder = {
            'baby': 1,
            'junior': 2,
            'adult': 3,
            'senior': 4
        };

        // Apply sorting
        result = result.sort((a, b) => {
            if (sortOption === 'name') {
                return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
            } else if (sortOption === 'age') {
                return (lifeStageOrder[a.life_stage] || 0) - (lifeStageOrder[b.life_stage] || 0);
            }
            return 0;
        });

        setFilteredAnimals(result);
    }, [filters, sortOption, animals]);

    return (
        <Container fluid>
            <Row>
                <Col lg="3">
                    <FilterSection filters={filters} setFilters={setFilters} />
                </Col>
                <Col lg="9">
                    <div style={{ marginBottom: '1rem' }}>
                        <label htmlFor="sortOption">Sort By: </label>
                        <select id="sortOption" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                            <option value="name">Name</option>
                            <option value="age">Age</option>
                        </select>
                    </div>
                    {loading ? ( // Display loading GIF while it fetches
                        <div className="loading-container">
                            <img src="/src/images/gifs/thirdloadingcat.gif" alt="Loading..." />
                        </div>
                    ) : (
                        <Row>
                            {filteredAnimals.length > 0 ? (
                                filteredAnimals.map((animal) => (
                                    <Col lg="4" key={animal.id}>
                                        <AnimalCard animal={animal} />
                                    </Col>
                                ))
                            ) : (
                                <Col lg="12">
                                    <p>No animals match the selected filters.</p>
                                </Col>
                            )}
                        </Row>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default AnimalSearch;
