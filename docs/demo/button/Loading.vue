<template>
  <div>
    <tk-button type="primary" loading>Loading</tk-button>
    <tk-button type="primary" loading-icon="circle-notch" loading
      >Loading</tk-button
    >
    <tk-button type="primary" loading>
      <template #loading>
        <er-icon style="margin-right: 6px" icon="star" spin />
      </template>
      Loading
    </tk-button>
  </div>
</template>