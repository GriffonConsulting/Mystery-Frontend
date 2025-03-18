import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Cookies, CookiesProvider } from 'react-cookie';
import { describe, expect, it, vi } from 'vitest';
import Product from '../../Pages/Product/Product';
import api from '../../__generated__/api';
import { Difficulty, GetProductDto, ProductType } from '../../__generated__/api-generated';
import i18n from '../../i18n';

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

api.product.getProduct = vi.fn((): any => Promise.resolve({ data: { result: mockProduct } }));

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
      expect(screen.getByText(mockProduct.subtitle)).toBeInTheDocument();
      expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    });
  });

  // it('add product to basket', async () => {
  //   const cookies = new Cookies();
  //   const setCookie = vi.fn();
  //   cookies.set = setCookie;

  //   render(
  //     <BrowserRouter>
  //       <CookiesProvider cookies={cookies}>
  //         <Product />
  //       </CookiesProvider>
  //     </BrowserRouter>,
  //   );

  //   await waitFor(() => {
  //     expect(api.product.getProduct).toHaveBeenCalled();
  //     const addToBasketButton = screen.getByText(i18n.t('addToBasket'));
  //     fireEvent.click(addToBasketButton);
  //   });

  //   await waitFor(() => {
  //     expect(setCookie).toHaveBeenCalled();
  //   });
  // });
});
