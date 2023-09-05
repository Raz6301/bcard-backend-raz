import React from "react";
import Container from "@mui/material/Container";
import PageHeader from "./../components/PageHeader";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

const AboutPage = () => {
  return (
    <Container maxWidth="lg">
      <PageHeader
        title="About Page"
        subtitle="On this page you can find explanations about using the application"
      />
      <Typography
        textAlign="center"
        variant="h1"
        fontFamily="arial"
        fontWeight="700"
        fontSize="5vw"
        color="crimson"
        padding="20px"
      >
        Welcome!
      </Typography>

      <Grid
        container
        rowSpacing={5}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ textAlign: "center" }}
      >
        <Grid item xs={4} lg={7}>
          <Typography
            textAlign="center"
            component="p"
            fontFamily="roboto"
            fontWeight="550"
            fontSize="2.5vw"
            mt="40px"
          >
            You have arrived <br /> to BCard website!
          </Typography>
        </Grid>

        <Grid item xs={8} lg={3}>
          <Typography>
            <img
              src="/assets/images/business-card.png"
              alt="Bcard logo"
              width="200px"
            />
          </Typography>
        </Grid>

        <Grid item xs={3} lg={7}>
          <Typography
            textAlign="center"
            variant="h1"
            fontFamily="roboto"
            fontWeight="550"
            fontSize="2.5vw"
            mt="10px"
          >
            in our website you can post photos of your business, and of course
            enjoy photos of existing businesses.
          </Typography>
        </Grid>

        <Grid item xs={9} lg={3}>
          <Typography>
            <img
              src="/assets/images/website.png"
              alt="Bcard logo"
              style={{ width: "350px" }}
            />
          </Typography>
        </Grid>

        <Grid item xs={3} lg={7}>
          <Typography
            textAlign="center"
            variant="h1"
            fontFamily="roboto"
            fontWeight="550"
            fontSize="2.5vw"
            mt="10px"
          >
            if you want enjoy all the features of the site, you must singup
            first. Make sure you fill in the correct details if you are a
            business!
          </Typography>
        </Grid>

        <Grid item xs={9} lg={3}>
          <Typography>
            <img
              src="/assets/images/signup.png"
              alt="Bcard logo"
              style={{ width: "350px" }}
            />
          </Typography>
        </Grid>

        <Grid item xs={3} lg={7}>
          <Typography
            textAlign="center"
            variant="h1"
            fontFamily="roboto"
            fontWeight="550"
            fontSize="2.5vw"
            mt="10px"
          >
            If you chose a business user, you can start posting photos from your
            business.
          </Typography>
        </Grid>

        <Grid item xs={9} lg={3}>
          <Typography>
            <img
              src="/assets/images/registerBusiness.gif"
              alt="Bcard logo"
              style={{ width: "350px" }}
            />
          </Typography>
        </Grid>

        <Grid item xs={3} lg={7}>
          <Typography
            textAlign="center"
            variant="h1"
            fontFamily="roboto"
            fontWeight="550"
            fontSize="2.5vw"
            mt="10px"
          >
            In order to upload a photo you must fill in the details on the card
            creation page, make sure all the fields marked with * are filled in!
          </Typography>
        </Grid>

        <Grid item xs={9} lg={3}>
          <Typography>
            <img
              src="/assets/images/createcard.png"
              alt="Bcard logo"
              style={{ width: "350px" }}
            />
          </Typography>
        </Grid>
      </Grid>

      <Typography
        textAlign="center"
        variant="h1"
        fontFamily="arial"
        fontWeight="700"
        fontSize="4vw"
        color="crimson"
        mt="50px"
        paddingBottom="20px"
      >
        thanks for choosing us!
      </Typography>
    </Container>
  );
};

export default AboutPage;
