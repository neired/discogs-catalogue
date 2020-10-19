import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

test('renders search button', () => {
  const { getByText } = render(<App />);
  const searchBtn = getByText(/Search/i);
  expect(searchBtn).toBeInTheDocument();
});

describe('App component', () => {

  describe('methods', () => {
    let instance

    beforeEach(() => {
      const wrapper = shallow(<App />);
      instance = wrapper.instance()
    })

    it('getQuery', () => {
      instance.setState = jest.fn()

      const expectedQuery = 'expectedQuery'
      const mockEvent = { currentTarget: { value: expectedQuery }}

      instance.getQuery(mockEvent)

      expect(instance.setState).toHaveBeenCalledWith({
        query: expectedQuery
      })
    })

    describe('getSearch', () => {

      beforeEach( () => {
        instance.setState = jest.fn();
      })

      it('with only one value', () => {
        const expectedSearch = 'expectedSearch';
        const mock = {
          target: {
            value: expectedSearch
          }
        }

        instance.getSearch(mock)

        expect(instance.setState).toHaveBeenCalledWith({
          searchBy: [expectedSearch]
        })
      })

      it('with many values', () => {
        const expectedSearch = 'expectedSearch';
        const mock = {
          target: {
            value: ','+expectedSearch
          }
        }

        instance.getSearch(mock)

        expect(instance.setState).toHaveBeenCalledWith({
          searchBy: ['', 'expectedSearch']
        })
      })
    })

    describe('searchByEnter', () => {

      beforeEach(() => {
        instance.fetchQueryData = jest.fn();
      })

      it('when pressing enter key', () => {
        const expectedKey = 'Enter';
        const mock = {
          key: expectedKey
        }

        instance.searchByEnter(mock)

        expect(instance.fetchQueryData).toHaveBeenCalled();
      })

      it('when pressing a key that is not enter', () => {
        const expectedKey = 'A';
        const mock = {
          key: expectedKey
        }

        instance.searchByEnter(mock)

        expect(instance.fetchQueryData).not.toHaveBeenCalled();
      })
    })
  })
})