import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function ContentItem({content}) {
  const [className, setClassName] = useState("content-item");

  return (
    <div className={className} onMouseEnter={handleHover} onMouseLeave={handleUnhover}>
      <img src={content.image} alt="image content"/>
      <div className="text-resource">
        <div className="source-title">{content.title}</div>
        <div className="description">{content.description}</div>
      </div>
    </div>
  )

  function handleHover() {
    setClassName("content-item hover-content")
  }
  function handleUnhover() {
    setClassName("content-item")
  }
}

function ContentList({content}) {
  
  console.log(content.sectionName)
  return (
    <div className="content-list">
      <div className="content-list-title">{content.sectionName}</div>
      <div className="line-list" />
      <div className="order-text">Ordenar A-Z</div>
      <ul className="list-container">
        {content.resources.map((value) => {
          return <ContentItem key={value.id} content={value} />
        })}
      </ul>
    </div>
  );

  
}

function App() {
  const [contents, setContents] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getContent()
      console.log(data)
      setContents(data)
    }
    fetchData()
  }, [])

  return (
    <div className="App">
      <div className="top-menu">
        <div className="group-menu">
          <span className="text-tab active-tab"  style={{position: 'absolute', left: '0px'}}>Talleres</span>
          <span className="text-tab"  style={{position: 'absolute', right: '0px'}}>Rincones</span>
        </div>
        <div className="active-bar"></div>
        <div className="vector"></div>
      </div>
      <div className="content">
        <div className="section-title">Talleres</div>
        <div className="content-container">
          {contents.map((value) => {
            return <ContentList key={value.sectionName} content={value} />
          })}
        </div>
      </div>
    </div>
  );

  async function getContent() {
    return (
      await fetch("https://api.mocklets.com/p68016/talleres")
        .then(response => response.json())
    )
  }
}

export default App;
