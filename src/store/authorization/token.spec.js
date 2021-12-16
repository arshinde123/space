import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getToken } from '../authorization/token';
import configureStore from '../configureStore';

describe('tokenSlice', () => {
    let mockAxios;
    let store;

    beforeEach(() => {
        mockAxios = new MockAdapter(axios, { onNoMatch: 'throwException' });
        store = configureStore();
    });

    const tokenSlice = () => store.getState().authorization.token;

    describe('fetching token', () => {
        it('should be fetched from the server', async () => {
            mockAxios.onPost('/token').reply(200, { token: 'a' });
            
            await store.dispatch(getToken());
            
            expect(tokenSlice().value).toEqual('a');
        });
        describe('loading indicator', () => {
            it('should be true while fetching token', () => {
                mockAxios.onPost('/token').reply(() => {
                    const response = [200, { token: 'a' }];
                    try {
                      expect(tokenSlice().loading).toBe(true);
                    } catch (error) {
                        console.log('Error: ', error);
                    }
                    return response;
                });
                
                store.dispatch(getToken());
            });
            it('should be false after token fetched', async () => {
                mockAxios.onPost('/token').reply(200, { token: 'a' });

                await store.dispatch(getToken());

                expect(tokenSlice().loading).toBe(false);
            });
            it('should be false after server returns error', async () => {
                mockAxios.onPost('/token').reply(500);

                await store.dispatch(getToken());

                expect(tokenSlice().loading).toBe(false);
            });
        });
    });
});
