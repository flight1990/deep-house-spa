<script setup>
	import { useStoreModule } from "../../composables/useStoreModule.js";
	import { computed, onMounted, ref } from "vue";
	import { useTreeData } from "../../composables/useTreeData.js";
	import { useToast } from "primevue/usetoast";

	const toast = useToast();

	const { id } = defineProps({
		id: String,
	});

	const { getState, dispatchAction } = useStoreModule("productsStore");
	const {
		getState: getCategoriesState,
		dispatchAction: dispatchCategoriesAction,
	} = useStoreModule("categoriesStore");

	const item = getState("item");
	const categories = computed(() => useTreeData(getCategoriesState("items").value));

	const payload = ref({
		name: "",
		description: "",
		price: "",
		category_id: "",
	});

	const initPayload = (data) => {
		payload.value.name = data.name;
		payload.value.description = data.description;
		payload.value.price = data.price;
		payload.value.category_id = data.category_id ?? "";
	};

	const onSubmit = () => {
		if (id) {
			dispatchAction("updateItem", { payload: payload.value, id: id });
			toast.add({
				severity: "success",
				summary: "Успех!",
				detail: "Продукт успешно изменен!",
				life: 3000,
			});
		} else {
			dispatchAction("createItem", payload.value);
			toast.add({
				severity: "success",
				summary: "Успех!",
				detail: "Продукт успешно создан!",
				life: 3000,
			});
		}
	};

	onMounted(async () => {
		if (id) {
			await dispatchAction("fetchItem", id);
			initPayload(item.value);
		}
		await dispatchCategoriesAction("fetchItems");
	});
</script>

<template>
	<div>
		<Card>
			<template #title>
				<div class="flex items-center justify-between gap-x-10 gap-y-4">
					<div class="flex items-center gap-x-2">
						<Button as="router-link" :to="{ name: 'products.index' }" icon="pi pi-arrow-left"
							severity="secondary" text />
						{{
							payload.name
							? "Редактировать продукт"
							: "Создать продукт"
						}}
					</div>
					<div class="flex items-center gap-x-2"></div>
				</div>
			</template>
			<template #content>
				<form class="space-y-4">
					<div class="flex flex-col gap-y-1">
						<label for="name">Название</label>
						<InputText id="name" v-model="payload.name" type="text" :invalid="false" />
						<small v-if="false" class="text-red-500">Error message</small>
					</div>
					<div class="flex flex-col gap-y-1">
						<label for="description">Описание</label>
						<Textarea id="description" v-model="payload.description" rows="3" cols="30" autoResize
							:invalid="false" />
						<small v-if="false" class="text-red-500">Error message</small>
					</div>
					<div class="flex flex-col gap-y-1">
						<label for="price1">Ценник</label>
						<InputNumber v-model="payload.price" inputId="price1" mode="decimal" suffix=" BYN" />
						<small v-if="false" class="text-red-500">Error message</small>
					</div>
					<Button type="submit" @click.prevent="onSubmit()" label="Сохранить" severity="success" />
				</form>
			</template>
		</Card>
	</div>
	<!-- <div>
    <form>
      <div>
        <label for="category_id">Category</label>
        <select name="category_id" id="category_id" v-model="payload.category_id">
          <option value="">Choose category...</option>
          <option :value="category.id" v-for="category in categories" :key="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>

      <div>
        <label for="name">Name:</label>
        <input v-model="payload.name" type="text" id="name" />
      </div>

      <div>
        <label for="description">Description:</label>
        <textarea
          rows="10"
          cols="150"
          v-model="payload.description"
          id="description"
        ></textarea>
      </div>

      <div>
        <label for="price">Price:</label>
        <input v-model="payload.price" type="text" id="price" />
      </div>

      <button type="submit" @click.prevent="onSubmit">Save</button>
    </form>
  </div> -->
</template>
