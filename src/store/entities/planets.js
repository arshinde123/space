import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from '../api';

let lastId = 0;

// Slice
const slice = createSlice({
    name: 'planets',
    initialState: {
        list: [],
        loading: false,
        lastFetch: null,
    },
    reducers: {
        planetsRequested: (planets, action) => {
            planets.loading = true;
        },
        planetsReceived: (planets, action) => {
            planets.list = action.payload.map((planet) => {
                planet.id = ++lastId;
                planet.selected = false;
                planet.label = planet.name;
                return planet;
            });
            planets.loading = false;
            planets.lastFetch = Date.now();
        },
        planetsRequestFailed: (planets, action) => {
            planets.loading = false;
        },
        planetSelected: (planets, action) => {
            const index = planets.list.findIndex(
                (planet) => planet.id === action.payload.id
            );
            planets.list[index].selected = true;

            if (action.payload.previousId) {
                const previousIndex = planets.list.findIndex(
                    (planet) => planet.id === action.payload.previousId
                );
                planets.list[previousIndex].selected = false;
            }
        },
        planetSelectionReset: (planets, action) => {
            const index = planets.list.findIndex(
                (planet) => planet.id === action.payload.id
            );
            planets.list[index].selected = false;
        },
        planetsSelectionReset: (planets, action) => {
            planets.list = planets.list.map((planet) => {
                planet.selected = false;
                return planet;
            });
        },
    },
});

const {
    planetsReceived,
    planetsRequested,
    planetsRequestFailed,
    planetSelected,
    planetSelectionReset,
    planetsSelectionReset,
} = slice.actions;

export default slice.reducer;

// Action Creators
export const loadPlanets = () => (dispatch, getState) => {
    const { lastFetch } = getState().entities.planets;

    if (lastFetch) {
        const diffInMinutes = (Date.now() - lastFetch) / 36000;
        if (diffInMinutes < 10) return;
    }

    return dispatch(
        apiCallBegan({
            url: '/planets',
            method: 'get',
            onStart: planetsRequested.type,
            onSuccess: planetsReceived.type,
            onError: planetsRequestFailed.type,
        })
    );
};

export const selectPlanet = (id, previousId) => (dispatch, getState) => {
    dispatch(planetSelected({ id, previousId }));
};

export const resetPlanetSelection = (id) => (dispatch, getState) => {
    dispatch(planetSelectionReset({ id }));
};

export const resetPlanetSelections = () => (dispatch, getState) => {
    dispatch(planetsSelectionReset());
};

// Selectors
export const getAvailablePlanets = createSelector(
    (state) => state.entities.planets,
    (planets) => planets.list.filter((planet) => !planet.selected)
);

export const getSelectedPlanetNames = createSelector(
    (state) => state.entities.planets,
    (planets) => {
        const selectedPlanetNames = [];
        planets.list.forEach((planet) => {
            if (planet.selected) selectedPlanetNames.push(planet.name);
        });
        return selectedPlanetNames;
    }
);
