import React, { useEffect, CSSProperties } from "react";
import Container from "@mui/material/Container";
import PageHeader from "./../../components/PageHeader";
import { Form, useParams } from "react-router-dom";
import Card from "../components/card/Card";
import useCards from "../hooks/useCards";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";
import { Box, Divider, Grid, Input } from "@mui/material";
import Typography from "@mui/material/Typography";
import { makeFirstLetterCapital } from "../../forms/utils/algoMethods";
import { ThemeProvider } from "../../providers/ThemeProvider";

const CardDetailsPage = () => {
  const { cardId } = useParams();
  const { value, handleGetCard } = useCards();
  const { card, error, isLoading } = value;

  useEffect(() => {
    if (cardId) handleGetCard(cardId);
  }, []);

  if (isLoading) return <Spinner />;
  if (error) return <Error errorMessage={error} />;
  if (!isLoading && !card) return <p>No card to display...</p>;

  if (!isLoading && card)
    return (
      <Container>
        <PageHeader
          title="Business Details"
          subtitle="Here you can see details of the business"
        />
        <Grid>
          <Grid item xs={10} sm={6} md={6} lg={10} mb="20px">
            <Box sx={{ textAlign: "center" }}>
              <img
                src={card.image.url}
                alt="key"
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                }}
              />
            </Box>
            <Grid item>
              <Box display="block">
                <Typography
                  variant="h1"
                  textAlign="center"
                  fontFamily="Oswald"
                  fontSize="7vw"
                  fontWeight="700"
                  color="navajowhite"
                  sx={{ textShadow: "2px 2px 2px rgba(0,0,0,0.6)" }}
                >
                  {makeFirstLetterCapital(card.title)}
                </Typography>
              </Box>
            </Grid>
            <Box display="block">
              <Typography
                variant="h3"
                fontFamily="Oswald"
                textAlign="center"
                fontSize="4vw"
                mb="5px"
                color="navajowhite"
                sx={{ textShadow: "2px 2px 2px rgba(0,0,0,0.6)" }}
              >
                {makeFirstLetterCapital(card.subtitle)}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Typography
              component="h2"
              variant="h5"
              textAlign="center"
              fontWeight="900"
            >
              some info on the bussiness:
            </Typography>
            <Typography variant="body1">
              <h1>
                description:
                <span style={{ fontWeight: "400" }}>
                  {` ` + makeFirstLetterCapital(card.description)}
                </span>
              </h1>
            </Typography>

            <Typography variant="subtitle2">
              <h1>
                country:
                <span style={{ fontWeight: "400" }}>
                  {` ` + makeFirstLetterCapital(card.address.country)}
                </span>
              </h1>

              {card.address.state && (
                <h1>
                  state:
                  <span style={{ fontWeight: "400" }}>
                    {` ` + makeFirstLetterCapital(`${card.address.state}`)}
                  </span>
                </h1>
              )}

              <h1>
                city:
                <span style={{ fontWeight: "400" }}>
                  {` ` + makeFirstLetterCapital(card.address.city)}
                </span>
              </h1>

              <h1>
                street:
                <span style={{ fontWeight: "400" }}>
                  {` ` + makeFirstLetterCapital(card.address.street)}
                </span>
              </h1>

              <h1>
                house Number:
                <span style={{ fontWeight: "400" }}>
                  {` ` + makeFirstLetterCapital(`${card.address.houseNumber}`)}
                </span>
              </h1>

              <h1>
                zip:
                <span style={{ fontWeight: "400" }}>
                  {` ` + makeFirstLetterCapital(`${card.address.zip}`)}
                </span>
              </h1>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    );
  return null;
};

export default CardDetailsPage;
