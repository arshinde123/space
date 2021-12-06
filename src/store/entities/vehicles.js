import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from '../api';

let lastId = 0;

// Slice
const slice = createSlice({
    name: 'vehicles',
    initialState: {
        list: [],
        loading: false,
        lastFetch: null,
    },
    reducers: {
        vehiclesRequested: (vehicles, action) => {
            vehicles.loading = true;
        },
        vehiclesReceived: (vehicles, action) => {
            vehicles.list = action.payload.map((vehicle) => {
                vehicle.id = ++lastId;
                vehicle.label = `${vehicle.name} (${vehicle.total_no})`;
                vehicle.value = vehicle.name.toLowerCase();
                vehicle.available_no = vehicle.total_no;
                vehicle.disabled = false;
                vehicle.checked = false;
                return vehicle;
            });
            vehicles.loading = false;
            vehicles.lastFetch = Date.now();
        },
        vehiclesRequestFailed: (vehicles, action) => {
            vehicles.loading = false;
        },
        vehicleSelected: (vehicles, action) => {
            const index = vehicles.list.findIndex(
                (vehicle) => vehicle.id === action.payload.id
            );
            vehicles.list[index].checked = true;
            vehicles.list[index].available_no =
                vehicles.list[index].available_no - 1;
            // vehicles.list[index].disabled = vehicles.list[index].available_no === 0;
            vehicles.list[
                index
            ].label = `${vehicles.list[index].name} (${vehicles.list[index].available_no})`;
            vehicles.list = vehicles.list.map((vehicle) => {
                if (action.payload.id !== vehicle.id) vehicle.checked = false;
                if (
                    action.payload.previousId &&
                    action.payload.previousId === vehicle.id
                ) {
                    vehicle.available_no += 1;
                    vehicle.disabled = false;
                    vehicle.label = `${vehicle.name} (${vehicle.available_no})`;
                }
                return vehicle;
            });
        },
        vehiclesResetToInitialStep: (vehicles, action) => {
            vehicles.list = vehicles.list.map((vehicle) => {
                vehicle.label = `${vehicle.name} (${vehicle.total_no})`;
                vehicle.available_no = vehicle.total_no;
                vehicle.disabled = false;
                vehicle.checked = false;
                return vehicle;
            });
        },
        unsupportedVehiclesDisabled: (vehicles, action) => {
            vehicles.list = vehicles.list.map((vehicle) => {
                vehicle.checked = false;
                if (
                    action.payload.selectedPlanet &&
                    vehicle.max_distance <
                        action.payload.selectedPlanet.distance
                ) {
                    vehicle.disabled = true;
                } else {
                    vehicle.disabled = vehicle.available_no === 0;
                }
                return vehicle;
            });
        },
        vehicleReset: (vehicles, action) => {
            const index = vehicles.list.findIndex(
                (vehicle) => vehicle.id === action.payload.id
            );

            vehicles.list[index].checked = false;
            vehicles.list[index].available_no =
                vehicles.list[index].available_no + 1;
            vehicles.list[
                index
            ].label = `${vehicles.list[index].name} (${vehicles.list[index].available_no})`;
        },
        vehiclesReset: (vehicles, action) => {
            vehicles.list = vehicles.list.map((vehicle) => {
                vehicle.checked = false;
                vehicle.disabled = false;
                return vehicle;
            });
        },
    },
});

const {
    vehiclesReceived,
    vehiclesRequested,
    vehiclesRequestFailed,
    vehicleSelected,
    vehiclesResetToInitialStep,
    unsupportedVehiclesDisabled,
    vehicleReset,
    vehiclesReset,
} = slice.actions;

export default slice.reducer;

// Action Creators
export const loadVehicles = () => (dispatch, getState) => {
    const { lastFetch } = getState().entities.vehicles;

    if (lastFetch) {
        const diffInMinutes = (Date.now() - lastFetch) / 36000;
        if (diffInMinutes < 10) return;
    }

    dispatch(
        apiCallBegan({
            url: '/vehicles',
            method: 'get',
            onStart: vehiclesRequested.type,
            onSuccess: vehiclesReceived.type,
            onError: vehiclesRequestFailed.type,
        })
    );
};

export const selectVehicle = (id, previousId) => (dispatch, getState) => {
    dispatch(vehicleSelected({ id, previousId }));
};

export const resetVehiclesToInitialStep = () => (dispatch, getState) => {
    dispatch(vehiclesResetToInitialStep());
};

export const disableUnsupportedVehicles =
    (selectedPlanet) => (dispatch, getState) => {
        dispatch(unsupportedVehiclesDisabled({ selectedPlanet }));
    };

export const resetVehicle = (id) => (dispatch, getState) => {
    dispatch(vehicleReset({ id }));
};

export const resetVehicles = () => (dispatch, getState) => {
    dispatch(vehiclesReset());
};

// Selectors
export const getAvailableVehicles = createSelector(
    (state) => state.entities.vehicles,
    (vehicles) => vehicles.list
);

export const getSelectedVehicleNames = createSelector(
    (state) => state.entities.vehicles,
    (vehicles) => {
        const selectedVehicleNames = [];
        vehicles.list.forEach((vehicle) => {
            const { total_no, available_no } = vehicle;
            if (total_no > available_no) {
                for (let i = 0; i < total_no - available_no; i++) {
                    selectedVehicleNames.push(vehicle.name);
                }
            }
        });
        return selectedVehicleNames;
    }
);
