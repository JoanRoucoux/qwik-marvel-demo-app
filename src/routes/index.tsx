import { $, component$, useSignal } from "@builder.io/qwik";
import { routeLoader$, server$, useLocation, type DocumentHead } from "@builder.io/qwik-city";
import { CharacterGrid } from '~/components/character-grid/CharacterGrid';
import { SearchForm } from '~/components/search-form/SearchForm';
import { getMarvelContext, getCharacters } from '~/services/marvel';
import type { Character } from '~/types';
import { getTotalPages } from '~/utils';

export const useSearchLoader = routeLoader$(async (requestEvent) => {
  const searchTerm = requestEvent.url.searchParams.get('search');

  if (!searchTerm) {
    return null;
  }

  const params = {
    context: getMarvelContext(requestEvent),
    limit: 12,
    page: 1,
    startsWith: searchTerm,
  };

  return await getCharacters(params);
});

export const getMore = server$(async function (page, searchTerm) {
  const params = {
    context: getMarvelContext(this),
    limit: 12,
    page,
    startsWith: searchTerm,
  };

  return await getCharacters(params);
});

export default component$(() => {
  const location = useLocation();
  const searchTerm = location.url.searchParams.get('search');

  const resource = useSearchLoader();

  const currentPage = useSignal<number>(1);
  const collection = useSignal<Character[]>(
    resource.value?.data?.results || []
  );

  const handleMore = $(async () => {
    const newData = await getMore(currentPage.value + 1, searchTerm);
    const newResults = newData.data?.results || [];
    collection.value = [...collection.value, ...newResults];
    currentPage.value += 1;
  });

  return (
    <>
      <SearchForm
        searchTerm={searchTerm}
      />
      {resource.value?.data?.results && (
        <CharacterGrid
          collection={collection.value}
          currentPage={currentPage.value}
          onMore$={handleMore}
          total={resource.value.data.total}
          totalPages={getTotalPages(resource.value.data.total, 12)}
        />
      )}
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
