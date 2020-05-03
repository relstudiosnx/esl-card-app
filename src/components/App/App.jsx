import React, { useState, useEffect } from 'react';
import Container from '../Container';
import Row from '../Row';
import Column from '../Column';
import InfiniteScroll from '../InfiniteScroll';
import Loader from '../Loader';
import Search from '../Search';
import Card from '../Card';
import Alert from '../Alert';


const App = () => {

  /* Initialize */
  const pageSize = 20;
  const [cards, setCards] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [name, setName] = useState('');
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [hasMoreItems, setHasMoreItems] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCards = () => {
    const apiUrl = `https://api.elderscrollslegends.io/v1/cards?name=${name}&page=${pageNumber}&pageSize=${pageSize}`;

    setIsLoading(true);
    setHasMoreItems(false);

    fetch(apiUrl).then((response) => {
      return response.ok ? response.json() : response.json().then((error) => Promise.reject(error));
    }).then((data) => {
      setCards([...cards, ...data.cards]);
      setIsLoading(false);
      setHasMoreItems(data._totalCount > pageNumber * pageSize);
    }).catch((error) => {
      setIsLoading(false);
    })

  };

  /* when name or page number changes fetch the card */
  useEffect(fetchCards, [name, pageNumber]);

  /* when search button is clicked, reset cards array to empty, set's page number to 1, and updates setName state with input string */
  const onSearch = (name) => {
    setCards([]);
    setPageNumber(1);
    setName(name);
  };

  const updatePageNumber = () => {
    if (!hasMoreItems) return;
    if (!isAtBottom) return;
    if (isLoading) return;
    setPageNumber(pageNumber + 1);
    setIsAtBottom(false);
  };

  /* when there are more items OR is page is at bottom OR card is not being fetched OR increment in page number, update page number */
  useEffect(updatePageNumber, [hasMoreItems, isAtBottom, isLoading, pageNumber])

  return (

    <Container>
      <Row>
        <Column columnClass="col-lg-12">
          <Search defaultSearchText={name} onSearch={onSearch} />
          {cards.length == 0 && !isLoading && !hasMoreItems && <Alert type="alert alert-info" msg="No items were found." />}
          <InfiniteScroll onIsAtBottomChange={setIsAtBottom}>
            <Row>
              {cards.map(card => <Column key={card.id} columnClass="col-lg-4"><Card data={card} /></Column>)}
            </Row>
            {isLoading && <Loader />}
          </InfiniteScroll>
        </Column>
      </Row>
    </Container>

  )
}

export default App;