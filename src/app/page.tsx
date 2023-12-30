"use client";
import React, { useState, useEffect } from 'react';
import getSuperheroData from './api';
import RootLayout from './layout';
import './globals.css'

type SuperHeroData = {
  name: string;
  id: string;
  appearance: {
    'eye-color': string;
    gender: string;
    'hair-color': string;
    height: string[];
  }

  biography: {
    aliases: string[];
    alignment: string;
    'alter-egos': string;
    'first-appearance': string;
    'full-name': string;
    'place-of-birth': string;
    publisher: string;
  }

  connections: {
    'group-affiliation': string;
    relatives: string;
  }

  image: {
    url: string;
  }

  work: {
    base: string;
    occupation: string;
  }

  powerstats: {
    combat: string;
    durability: string;
    intelligence: string;
    power: string;
    speed: string;
    strength: string;
  }
}

const MyComponent = () => {
  const [superheroData, setSuperheroData] = useState<SuperHeroData[]>([]);
  const [userSearch, setUserSearch] = useState('');

  useEffect(() => {
    
    const fetchData = async() => {
      try {
        const data = await getSuperheroData(userSearch);
        console.log(data);
        setSuperheroData(data.results as SuperHeroData[]);
      } catch (error) {
        console.error(error);
        return
      }
    } 
    fetchData();
    
  }, [userSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserSearch(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

const formatHeight = (height: string[]) => {
  const feet = height[0] || '0';
  const centimeters = height[1] || '0';

  return `${feet} ${centimeters}`;
}

const aliases = (aliases: string[]) => {
  return aliases.join(', ');
}

const getPowerStatBarStyle = (statValue: string): React.CSSProperties => {
  const value = parseInt(statValue, 10);
  const widthPercentage = `${value}%`;

  return {
    width: widthPercentage,
    height: '20px',
  };
};


return (
  <main>
    <div className="wrapper">
      <form onSubmit={handleSubmit} className="hero-search">
        <label>
          Enter Superhero Name:
            <input
              type="text"
              value={userSearch}
              onChange={handleInputChange}
            />
        </label>
        <button type="submit">Search</button>
      </form>
      <ul className="hero-list">
        {superheroData.map((superhero, i) => {
          return (
            <li key={i} className="hero-list-item">
              <div className="image-div">
                <img src={superhero.image.url}></img>
              </div>
              <div className="hero-info">
                  <div className="name-div">Name: {superhero.name}</div>
                  <div className="id-div">ID: {superhero.id}</div>
                  <div className="appearance-div">
                    Appearance:
                    <ul className="appearance-data">
                      <li>
                        Eye Color: {superhero.appearance['eye-color']}
                      </li>
                      <li>
                        Gender: {superhero.appearance.gender}
                      </li>
                      <li>
                        Hair Color: {superhero.appearance['hair-color']}
                      </li>
                      <li>
                        Height: {formatHeight(superhero.appearance.height)}
                      </li>
                    </ul>
                  </div>
                  <div className="bio-div">
                    Biography:
                    <ul className="bio-data">
                      <li>
                        Aliases: {aliases(superhero.biography.aliases)}
                      </li>
                      <li>
                        Alignment: {superhero.biography.alignment};
                      </li>
                      <li>
                        Alter-Egos: {superhero.biography['alter-egos']}
                      </li>
                      <li>
                        First Appearance: {superhero.biography['first-appearance']}
                      </li>
                      <li>
                        Full Name: {superhero.biography['full-name']}
                      </li>
                      <li>
                        Place of Birth: {superhero.biography['place-of-birth']}
                      </li>
                      <li>
                        Publisher: {superhero.biography.publisher}
                      </li>
                    </ul>
                  </div>
                  <div className="work-div">
                    Work:
                    <ul className="work-data">
                      <li>Base: {superhero.work.base}</li>
                      <li>Occupation: {superhero.work.occupation}</li>
                    </ul>
                  </div>
                  <div className="stats-div">
                    Power Stats:
                    <ul className="stats-data">
                      <li className="stat combat">
                        <div className="combat-bar stat-bar" style={getPowerStatBarStyle(superhero.powerstats.combat)}>
                          <p className="stat-text">Combat: {superhero.powerstats.combat}</p>
                        </div>
                      </li>
                      <li className="stat durability">
                        <div className="durability-bar stat-bar" style={getPowerStatBarStyle(superhero.powerstats.durability)}>
                          <p className="stat-text">Durability: {superhero.powerstats.durability}</p>
                        </div>
                      </li>
                      <li className="stat intelligence">
                        <div className="intelligence-bar stat-bar"  style={getPowerStatBarStyle(superhero.powerstats.intelligence)}>
                          <p className="stat-text">Intelligence: {superhero.powerstats.intelligence}</p>
                        </div>
                      </li>
                      <li className="stat power">
                        <div className="power-bar stat-bar" style={getPowerStatBarStyle(superhero.powerstats.power)}>
                          <p className="stat-text">Power: {superhero.powerstats.power}</p>
                        </div>
                      </li>
                      <li className="stat speed">
                        <div className="speed-bar stat-bar" style={getPowerStatBarStyle(superhero.powerstats.speed)}>
                          <p className="stat-text">Speed: {superhero.powerstats.speed}</p>
                        </div>
                      </li>
                      <li className="stat strength">
                        <div className="strength-bar stat-bar" style={getPowerStatBarStyle(superhero.powerstats.strength)}>
                          <p className="stat-text">Strength: {superhero.powerstats.strength}</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
            </li>
          )
        })}  
      </ul>  
    </div>
  </main>
);

};

export default MyComponent;