<template>
    <div class="page-loader" v-if="!isLoaded">
        <v-progress-circular indeterminate></v-progress-circular>
    </div>
</template>

<script>
export default
    {
        data: () => {
            return {
                isLoaded: false,
            }
        },

        mounted() {

            document.onreadystatechange = () => {
                if (document.readyState == "complete") {
                    this.isLoaded = true
                }
            }

        }


    }
</script>

<style>
.page-loader {
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #333;
    z-index: 999;
}
</style>