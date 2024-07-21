import { component$ } from '@builder.io/qwik';
import type { Nullable } from '~/types';

type Props = {
  searchTerm: Nullable<string>;
};

export const SearchForm = component$((props: Props) => (
  <section class="bg-base-200 mt-8 rounded">
    <div class="flex flex-col items-center gap-4 p-8">
      <h1 class="text-3xl uppercase">Explore</h1>
      <p>Search your favorite Marvel characters!</p>
      <form class="flex flex-col md:flex-row justify-center items-center max-w-lg w-full gap-4">
        <input
          type="text"
          placeholder="Spider-Man, Thor, Avengers..."
          name="search"
          class="input w-full md:w-3/6"
          value={props.searchTerm}
        />
        <button type="submit" class="btn btn-primary w-full md:w-1/6">
          Search
        </button>
      </form>
    </div>
  </section>
));
