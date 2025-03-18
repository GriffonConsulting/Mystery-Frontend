import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider, Cookies } from 'react-cookie';
import { describe, expect, it, vi } from 'vitest';
import api from '../../__generated__/api';
import { Difficulty, GetProductDto, ProductType } from '../../__generated__/api-generated';
import Products from '../../Pages/Product/Products';

const mockProducts: GetProductDto[] = [
  {
    id: '1',
    title: 'Produit 1',
    subtitle: 'Sous-titre 1',
    description: 'Description du produit 1',
    nbPlayerMin: 2,
    nbPlayerMax: 4,
    price: 19.99,
    productCode: 'P001',
    images: [''],
    duration: '',
    difficulty: Difficulty.Easy,
    productType: ProductType.MurderParty,
  },
  {
    id: '2',
    title: 'Produit 2',
    subtitle: 'Sous-titre 2',
    description: 'Description du produit 2',
    nbPlayerMin: 3,
    nbPlayerMax: 6,
    price: 29.99,
    productCode: 'P002',
    images: [''],
    duration: '',
    difficulty: Difficulty.Easy,
    productType: ProductType.MurderParty,
  },
];

api.product.getProducts = vi.fn(():any => Promise.resolve({ data: { result: mockProducts }, }));

describe('Products Component', () => {
  it('renders products correctly', async () => {
    render(
      <BrowserRouter>
        <CookiesProvider>
          <Products />
        </CookiesProvider>
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(api.product.getProducts).toHaveBeenCalled();
      expect(screen.getByText('Produit 1')).toBeInTheDocument();
      expect(screen.getByText('Produit 2')).toBeInTheDocument();
    });
  });

  it('adds product to basket', async () => {
    const cookies = new Cookies();
    const setCookie = vi.fn();
    cookies.set = setCookie;

    render(
      <BrowserRouter>
        <CookiesProvider cookies={cookies}>
          <Products />
        </CookiesProvider>
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(api.product.getProducts).toHaveBeenCalled();
      const addToBasketButton = screen.getAllByText('Ajouter au panier')[0];
      fireEvent.click(addToBasketButton);
    });

    await waitFor(() =>
      expect(setCookie).toHaveBeenCalledWith('basket', ['1'], { sameSite: true, secure: true, path: '/' }),
    );
  });
});
