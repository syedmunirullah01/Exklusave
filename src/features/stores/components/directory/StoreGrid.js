import StoreCard from "./StoreCard";

export default function StoreGrid({ stores }) {
  return (
    <div className="flex-1">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stores.map((store) => (
          <StoreCard key={store.name || store.id} store={store} />
        ))}
      </div>
    </div>
  );
}

