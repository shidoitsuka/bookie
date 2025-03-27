import { fireEvent, render, screen } from '@testing-library/react';

import BookModal from '@/components/bookModal/BookModal';

import { VolumeInfo } from '@/types/books';

const mockBook: VolumeInfo = {
  title: 'Test Book',
  subtitle: 'A Great Read',
  authors: ['John Doe'],
  publisher: 'Test Publisher',
  publishedDate: '2025',
  maturityRating: 'Everyone',
  categories: ['Fiction'],
  description: 'A wonderful book about testing.',
  imageLinks: { thumbnail: 'test-image-url', smallThumbnail: 'test-image-url-sm' },
  readingModes: undefined,
  printType: '',
  allowAnonLogging: false,
  contentVersion: '',
  panelizationSummary: undefined,
  language: '',
  previewLink: '',
  infoLink: '',
  canonicalVolumeLink: '',
} as unknown as VolumeInfo;

describe('BookModal Component', () => {
  it('renders the modal when isOpen is true', () => {
    render(<BookModal isOpen={true} detail={mockBook} onClose={jest.fn()} id="1" />);
    expect(screen.getByTestId('book_modal')).toBeInTheDocument();
  });

  it('displays book details correctly', () => {
    render(<BookModal isOpen={true} detail={mockBook} onClose={jest.fn()} id="1" />);
    expect(screen.getByTestId('book_modal')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onCloseMock = jest.fn();
    render(<BookModal isOpen={true} detail={mockBook} onClose={onCloseMock} id="1" />);
    fireEvent.click(screen.getByTestId('book_modal_close-btn'));
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('does not render when isOpen is false', () => {
    render(<BookModal isOpen={false} detail={mockBook} onClose={jest.fn()} id="1" />);
    expect(screen.queryByTestId('book_modal_title')).not.toBeInTheDocument();
  });
});
