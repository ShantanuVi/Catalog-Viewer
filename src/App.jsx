
import { useState, useEffect } from "react";
import "./App.css";
import { ImagesData } from "./mock-data/ImagesData";
import Grid from "@mui/material/Grid";
import { Box, Fab } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeImage, setActiveImage] = useState(ImagesData[activeIndex]);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === ImagesData.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    if (paused) clearInterval(intervalId);

    return () => clearInterval(intervalId);
  }, [paused]);

  useEffect(() => {
    setActiveImage(ImagesData[activeIndex]);
  }, [activeIndex]);

  return (
    <Box
      sx={{
        padding: "2%",
        width: "96%",
      }}
    >
      <Grid container>
        <Grid
          item
          lg={8}
          xs={12}
          style={{ position: "relative" }}
        >
          <div className="imageAndButtonContainer">
            <img
              src={activeImage.url}
              alt="image0"
              className="selectedImage"
            />
          </div>
          <div className="buttonsContainer">
            <Fab
              className="floatingActionButton buttonOne"
              sx={{ mr: 1 }}
              color="primary"
              onClick={() =>
                setActiveIndex((prevIndex) =>
                  prevIndex === 0 ? ImagesData.length - 1 : prevIndex - 1
                )
              }
            >
              <ArrowBackIcon />
            </Fab>
            <Fab
              className="floatingActionButton buttonTwo"
              color="primary"
              onClick={() =>
                setActiveIndex((prevIndex) =>
                  prevIndex === ImagesData.length - 1 ? 0 : prevIndex + 1
                )
              }
            >
              <ArrowForwardIcon />
            </Fab>
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          lg={4}
        >
          <p className="titleText">{activeImage.title}</p>
          <p className="imageText">{activeImage.description}</p>
        </Grid>
        <Grid
          item
          xs={12}
          lg={8}
        >
          <div className="thumbnailsContainer">
            {ImagesData.map((image, i) => (
              <img
                key={image.id}
                alt="fullImage"
                src={image.url}
                onClick={() => setActiveIndex(i)}
                className={
                  image.id === activeImage.id
                    ? "imageThumbnail"
                    : "imageThumbnail grayscale"
                }
              />
            ))}
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
        >
          <div className="playButtonContainer">
            <Fab
              color="primary"
              size="xl"
              className="floatingActionButton largeButton"
              onClick={() => setPaused(!paused)}
            >
              {paused ? <PlayArrowIcon /> : <PauseIcon />}
            </Fab>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;


