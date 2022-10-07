import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MongoDsDataSource} from '../datasources';
import {Author, Book, BookCategory, BookItems, BookRelations, EdClass, Genre, Language, Publisher, Reservation, Subject} from '../models';
import {AuthorRepository} from './author.repository';
import {BookCategoryRepository} from './book-category.repository';
import {BookItemsRepository} from './book-items.repository';
import {EdClassRepository} from './ed-class.repository';
import {GenreRepository} from './genre.repository';
import {LanguageRepository} from './language.repository';
import {PublisherRepository} from './publisher.repository';
import {ReservationRepository} from './reservation.repository';
import {SubjectRepository} from './subject.repository';

export class BookRepository extends DefaultCrudRepository<
  Book,
  typeof Book.prototype._id,
  BookRelations
> {

  public readonly author: BelongsToAccessor<Author, typeof Book.prototype._id>;

  public readonly publisher: BelongsToAccessor<Publisher, typeof Book.prototype._id>;

  public readonly subject: BelongsToAccessor<Subject, typeof Book.prototype._id>;

  public readonly bookCategory: BelongsToAccessor<BookCategory, typeof Book.prototype._id>;

  public readonly genre: BelongsToAccessor<Genre, typeof Book.prototype._id>;

  public readonly language: BelongsToAccessor<Language, typeof Book.prototype._id>;

  public readonly edClass: BelongsToAccessor<EdClass, typeof Book.prototype._id>;

  public readonly bookItems: HasManyRepositoryFactory<BookItems, typeof Book.prototype._id>;

  public readonly reservations: HasManyRepositoryFactory<Reservation, typeof Book.prototype._id>;

  constructor(
    @inject('datasources.mongoDs') dataSource: MongoDsDataSource, @repository.getter('AuthorRepository') protected authorRepositoryGetter: Getter<AuthorRepository>, @repository.getter('PublisherRepository') protected publisherRepositoryGetter: Getter<PublisherRepository>, @repository.getter('SubjectRepository') protected subjectRepositoryGetter: Getter<SubjectRepository>, @repository.getter('BookCategoryRepository') protected bookCategoryRepositoryGetter: Getter<BookCategoryRepository>, @repository.getter('GenreRepository') protected genreRepositoryGetter: Getter<GenreRepository>, @repository.getter('LanguageRepository') protected languageRepositoryGetter: Getter<LanguageRepository>, @repository.getter('EdClassRepository') protected edClassRepositoryGetter: Getter<EdClassRepository>, @repository.getter('BookItemsRepository') protected bookItemsRepositoryGetter: Getter<BookItemsRepository>, @repository.getter('ReservationRepository') protected reservationRepositoryGetter: Getter<ReservationRepository>,
  ) {
    super(Book, dataSource);

    (this.modelClass as any).observe('persist', async (ctx: any) => {
      ctx.data.modified_At = new Date();
    });
    this.reservations = this.createHasManyRepositoryFactoryFor('reservations', reservationRepositoryGetter,);
    this.registerInclusionResolver('reservations', this.reservations.inclusionResolver);
    this.bookItems = this.createHasManyRepositoryFactoryFor('bookItems', bookItemsRepositoryGetter,);
    this.registerInclusionResolver('bookItems', this.bookItems.inclusionResolver);
    this.edClass = this.createBelongsToAccessorFor('edClass', edClassRepositoryGetter,);
    this.registerInclusionResolver('edClass', this.edClass.inclusionResolver);
    this.language = this.createBelongsToAccessorFor('language', languageRepositoryGetter,);
    this.registerInclusionResolver('language', this.language.inclusionResolver);
    this.genre = this.createBelongsToAccessorFor('genre', genreRepositoryGetter,);
    this.registerInclusionResolver('genre', this.genre.inclusionResolver);
    this.bookCategory = this.createBelongsToAccessorFor('bookCategory', bookCategoryRepositoryGetter,);
    this.registerInclusionResolver('bookCategory', this.bookCategory.inclusionResolver);
    this.subject = this.createBelongsToAccessorFor('subject', subjectRepositoryGetter,);
    this.registerInclusionResolver('subject', this.subject.inclusionResolver);
    this.publisher = this.createBelongsToAccessorFor('publisher', publisherRepositoryGetter,);
    this.registerInclusionResolver('publisher', this.publisher.inclusionResolver);
    this.author = this.createBelongsToAccessorFor('author', authorRepositoryGetter,);
    this.registerInclusionResolver('author', this.author.inclusionResolver);
  }
}
