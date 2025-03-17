import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, Params } from 'react-router-dom';
import { CookiesProvider, Cookies } from 'react-cookie';
import { describe, expect, it, vi } from 'vitest';
import Product from '../../Pages/Product/Product';
import api from '../../__generated__/api';
import { Difficulty, GetProductDto, ProductType } from '../../__generated__/api-generated';

vi.mock('react-router-dom', () => ({
  useParams: (): any => ({ productCode: 'P001' }),
  BrowserRouter: vi.fn().mockImplementation(props => props.children),
  Link: vi.fn().mockImplementation(props => props.children),
}));

const mockProduct: GetProductDto = {
  id: '1',
  title: 'Produit Test',
  subtitle: 'Sous-titre Test',
  description: 'Description du produit test',
  nbPlayerMin: 2,
  nbPlayerMax: 4,
  price: 19.99,
  productCode: 'P001',
  images: ['', ''],
  duration: '',
  difficulty: Difficulty.Easy,
  productType: ProductType.MurderParty,
};

api.product.getProduct = vi.fn(() => Promise.resolve({ data: { result: mockProduct } }));

describe('Product Component', () => {
  it('renders product details correctly', async () => {
    render(
      <BrowserRouter>
        <CookiesProvider>
          <Product />
        </CookiesProvider>
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(api.product.getProduct).toHaveBeenCalled();
      expect(screen.getByText('Sous-titre Test')).toBeInTheDocument();
      expect(screen.getByText('Description du produit test')).toBeInTheDocument();
      expect(screen.getByText('2 à 4 joueurs')).toBeInTheDocument();
    });
  });

  //   it('add product to basket', async () => {
  //     const cookies = new Cookies();
  //     const setCookie = vi.fn();
  //     cookies.set = setCookie;

  //     render(
  //       <BrowserRouter>
  //         <CookiesProvider cookies={cookies}>
  //           <Product />
  //         </CookiesProvider>
  //       </BrowserRouter>,
  //     );

  //     await waitFor(() => {
  //       expect(api.product.getProduct).toHaveBeenCalled();
  //       const addToBasketButton = screen.getByText('Ajouter au panier');
  //       fireEvent.click(addToBasketButton);
  //       console.warn(addToBasketButton);
  //     });

  //     await waitFor(() => expect(setCookie).toHaveBeenCalled());
  //   });
});
