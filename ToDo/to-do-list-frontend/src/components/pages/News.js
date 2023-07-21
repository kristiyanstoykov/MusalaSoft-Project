import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

const News = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get(
                    'https://newsapi.org/v2/top-headlines?country=us&apiKey=b5c2db9594d74c82b4f3709ef017c761'
                );
                setArticles(response.data.articles);
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };

        fetchArticles();
    }, []);

    return (
        <Container>
            <h1 className="mt-4 mb-4">Top Headlines</h1>
            <Row xs={1} sm={2} md={3} lg={4} xl={4} xxl={4}>
                {articles.map((article) => (
                    <Col key={article.url} className="mb-4">
                        <Card>
                            {article.urlToImage && (
                                <Card.Img variant="top" src={article.urlToImage} alt={article.title} />
                            )}
                            <Card.Body>
                                <Card.Title>
                                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                                        {article.title}
                                    </a>
                                </Card.Title>
                                <Card.Text>{article.description}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default News;
