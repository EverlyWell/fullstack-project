import { FunctionComponent, useState } from 'react';
import './App.css';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Box, Paper, Tab, Tabs,  } from '@mui/material';
import { TabContext, TabList, TabPanel  } from '@mui/lab';
import { ICategory } from '../../typings/typings';
import FiltersView from '../Filters/FiltersView';
import CatListView from '../CatsList/CatsListView';
import FavsListView from '../FavsList/FavsListView';

interface IApp {
}

const App: FunctionComponent<IApp> = () => {
  const [category, setCategory] = useState<ICategory>();
  const [tabValue, setTabValue] = useState<string>('cats');

  const handleCategorySelect = (selectedCategory: ICategory) => setCategory(selectedCategory);
  const handleTabValueChange = (event: any, newValue: string) => setTabValue(newValue);

  return (
    <Container maxWidth="md" className="App">
      <Paper>
        <Typography variant="h4" component="h1" gutterBottom>
          The Cats API challenge
        </Typography>
        <FiltersView
          handleCategorySelect={handleCategorySelect}
        />
        <Box sx={{ width: '100%' }}>
          <TabContext value={tabValue}>
            <TabList onChange={handleTabValueChange} aria-label="lab API tabs example">
              <Tab label="Cats" value="cats" />
              <Tab label="Favourites" value="favourites" />
            </TabList>
            <TabPanel value="cats">
              <CatListView
                category={category}
              />
            </TabPanel>
            <TabPanel value="favourites">
              <FavsListView
                category={category}
              />
            </TabPanel>
          </TabContext>
        </Box>
      </Paper>
    </Container>
  );
}

export default App;
