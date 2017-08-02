<template>
    <div id="Topbar">
        <div class="logo">
            <h3>Resumer</h3>
        </div>
        <div class="user">
            <li @click="">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-user"></use>
                </svg>
            </li>
        </div>
        <MyDialog/>
    </div>

</template>

<script>
    import MyDialog from './MyDialog'


    export default {
      name: 'Topbar',
      components: {MyDialog},
    }
</script>

<style lang="scss">
    #Topbar {
        margin: 12px 0 ;
        position: relative;

        .logo{
            text-align: center;
        }
        .user {
            position: absolute;
            top: 10px;
            right: 20px;
            cursor: pointer;
            .icon {
                color: red;
                font-size: 24px;
            }
        }
    }

</style>