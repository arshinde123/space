import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { loadPlanets } from '../entities/planets';
import configureStore from '../configureStore';

describe('planetSlice', () => {
    let mockAxios;
    let store;

    beforeEach(() => {
        mockAxios = new MockAdapter(axios, { onNoMatch: 'throwException' });
        store = configureStore();
    });

    const planetSlice = () => store.getState().entities.planets;

    describe('fetching planets', () => {
        describe('if the planets already exist in the cache', () => {
            it('should not be fetched from the server again', async () => {
                mockAxios.onGet('/planets').reply(200, [{ id: 1 }]);

                await store.dispatch(loadPlanets());
                await store.dispatch(loadPlanets());

                expect(mockAxios.history.get.length).toBe(1);
            });
        });
        describe('if the planets does not exist in the cache', () => {
            it('should be fetched from the server', async () => {
                mockAxios.onGet('/planets').reply(200, [{ id: 1 }]);

                await store.dispatch(loadPlanets());

                expect(planetSlice().list).toHaveLength(1);
            });
            describe('loading indicator', () => {
                it('should be true while fetching planets', () => {
                    mockAxios.onGet('/planets').reply(() => {
                        const response = [200, [{ id: 1, name: 'a' }]];
                        try {
                            expect(planetSlice().loading).toBe(true);
                        } catch (error) {
                            console.log('Error: ', error);
                        }
                        return response;
                    });

                    store.dispatch(loadPlanets());
                });
                it('should be false after planets fetched', async () => {
                    mockAxios
                        .onGet('/planets')
                        .reply(200, [{ id: 1, name: 'a' }]);

                    await store.dispatch(loadPlanets());

                    expect(planetSlice().loading).toBe(false);
                });
                it('should be false after server returns error', async () => {
                    mockAxios.onGet('/planets').reply(500);

                    await store.dispatch(loadPlanets());

                    expect(planetSlice().loading).toBe(false);
                });
            });
        });
    });
});
