begin;

alter table public.orders add column if not exists tracking_number text;

drop policy if exists "products delete own" on public.products;
create policy "products delete own" on public.products for delete using (
  auth.uid() = seller_id
  and not exists (select 1 from public.orders where orders.product_id = products.id)
);

drop policy if exists "orders seller update shipment" on public.orders;
create policy "orders seller update shipment" on public.orders for update
  using (auth.uid() = seller_id)
  with check (
    auth.uid() = seller_id
    and status = 'shipped'
    and tracking_number is not null
    and btrim(tracking_number) <> ''
  );

revoke update on public.orders from authenticated;
grant update (status, tracking_number) on public.orders to authenticated;

commit;