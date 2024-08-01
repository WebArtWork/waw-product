<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{{{title}}}</title>
    <meta itemprop="name" content="{{{title}}}" />
    <meta name="twitter:title" content="{{{title}}}" />
    <meta property="og:title" content="{{{title}}}" />

    <meta name="description" content="{{{description}}}" />
    <meta itemprop="description" content="{{{description}}}" />
    <meta name="twitter:description" content="{{{description}}}" />
    <meta property="og:description" content="{{{description}}}" />

    <meta itemprop="image" content="{{{image}}}" />
    <meta name="twitter:image:src" content="{{{image}}}" />
    <meta property="og:image" content="{{{image}}}" />
	<link rel="icon" type="image/png" href="{{{favicon}}}">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
	{% if keywords %}
    <meta name="keywords" content="{{{keywords}}}" />
    {% endif %}
	<base href="/" />
    <link rel="stylesheet" href="/vlv/css/index.css" />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
    />
    <style>
      
    </style>

    <style>
      :root {
      	--white: {{{variables.white || "#ffffff"}}};
      	--azure_sky: {{{variables.azure_sky || "#6cc4cc"}}};
      	--misty_turquoise: {{{variables.misty_turquoise || "#56aeb6"}}};
      	--charcoal_gray: {{{variables.charcoal_gray || "#4f4f4f"}}};
      	--menu_hover: {{{variables.menu_hover || "#454141"}}};
      	--footer_border: {{{variables.footer_border || "#363636"}}};
      	--hover_svg: {{{variables.hover_svg || "#4d4d4d"}}};
      	--ebony_black: {{{variables.ebony_black || "#2c2c2c"}}};
      	--blackest_night: {{{variables.blackest_night || "#2a2828"}}};
      	--black: {{{variables.black || "#000000"}}};
      	--silver_shimmer: {{{variables.silver_shimmer || "#d3d3d3"}}};
      }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <header class="header">
        <div class="container header__container">
          <div class="header__soc">
			{% if variables.link_instagram %}
            <a class="header__soc-img" href="{{{variables.link_instagram}}}">
              <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
              <svg
                width="800px"
                height="800px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                  fill="white"
                />
                <path
                  d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z"
                  fill="white"
                />
              </svg>
            </a>
			{% endif %}
      {% if variables.link_facebook %}
      <a class="header__soc-img" href="{{{variables.link_facebook}}}">
        <?xml version="1.0" encoding="iso-8859-1"?>
        <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
        <svg
          fill="white"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="800px"
          height="800px"
          viewBox="0 0 512 512"
          xml:space="preserve"
        >
          <g id="7935ec95c421cee6d86eb22ecd11b7e3">
            <path
              style="display: inline"
              d="M283.122,122.174c0,5.24,0,22.319,0,46.583h83.424l-9.045,74.367h-74.379
        c0,114.688,0,268.375,0,268.375h-98.726c0,0,0-151.653,0-268.375h-51.443v-74.367h51.443c0-29.492,0-50.463,0-56.302
        c0-27.82-2.096-41.02,9.725-62.578C205.948,28.32,239.308-0.174,297.007,0.512c57.713,0.711,82.04,6.263,82.04,6.263
        l-12.501,79.257c0,0-36.853-9.731-54.942-6.263C293.539,83.238,283.122,94.366,283.122,122.174z"
            ></path>
          </g>
        </svg>
      </a>
      {% endif %}
      <!-- {% if variables.link_tiktok%}
            <a class="header__soc-img" href="{{{variables.link_tiktok}}}">
              <?xml version="1.0" encoding="utf-8"?>
              <svg fill="#000000" width="800px" height="800px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.656 1.029c1.637-0.025 3.262-0.012 4.886-0.025 0.054 2.031 0.878 3.859 2.189 5.213l-0.002-0.002c1.411 1.271 3.247 2.095 5.271 2.235l0.028 0.002v5.036c-1.912-0.048-3.71-0.489-5.331-1.247l0.082 0.034c-0.784-0.377-1.447-0.764-2.077-1.196l0.052 0.034c-0.012 3.649 0.012 7.298-0.025 10.934-0.103 1.853-0.719 3.543-1.707 4.954l0.020-0.031c-1.652 2.366-4.328 3.919-7.371 4.011l-0.014 0c-0.123 0.006-0.268 0.009-0.414 0.009-1.73 0-3.347-0.482-4.725-1.319l0.040 0.023c-2.508-1.509-4.238-4.091-4.558-7.094l-0.004-0.041c-0.025-0.625-0.037-1.25-0.012-1.862 0.49-4.779 4.494-8.476 9.361-8.476 0.547 0 1.083 0.047 1.604 0.136l-0.056-0.008c0.025 1.849-0.050 3.699-0.050 5.548-0.423-0.153-0.911-0.242-1.42-0.242-1.868 0-3.457 1.194-4.045 2.861l-0.009 0.030c-0.133 0.427-0.21 0.918-0.21 1.426 0 0.206 0.013 0.41 0.037 0.61l-0.002-0.024c0.332 2.046 2.086 3.59 4.201 3.59 0.061 0 0.121-0.001 0.181-0.004l-0.009 0c1.463-0.044 2.733-0.831 3.451-1.994l0.010-0.018c0.267-0.372 0.45-0.822 0.511-1.311l0.001-0.014c0.125-2.237 0.075-4.461 0.087-6.698 0.012-5.036-0.012-10.060 0.025-15.083z"></path>
             </svg>
            </a>
			{% endif %} -->
          </div>

          <div class="header__title">
            <a href="/"><svg width="580px" height="80" viewBox="0 0 180 75" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M134.349 48.948C133.965 48.972 133.497 49.224 132.945 49.704C132.393 50.16 131.793 50.76 131.145 51.504C130.521 52.224 129.861 53.028 129.165 53.916C128.493 54.804 127.833 55.692 127.185 56.58C126.561 57.444 125.973 58.26 125.421 59.028C124.869 59.796 124.401 60.408 124.017 60.864C123.489 60.648 123.033 60.336 122.649 59.928C122.265 59.496 121.989 58.968 121.821 58.344C121.941 57.6 122.109 56.832 122.325 56.04C122.541 55.224 122.817 54.384 123.153 53.52C123.513 52.656 123.945 51.756 124.449 50.82C124.977 49.86 125.613 48.852 126.357 47.796C125.997 47.82 125.505 48.084 124.881 48.588C124.257 49.068 123.585 49.704 122.865 50.496C122.145 51.264 121.401 52.14 120.633 53.124C119.865 54.084 119.145 55.032 118.473 55.968C117.585 57.216 116.841 58.308 116.241 59.244C115.665 60.18 115.245 60.732 114.981 60.9C114.357 60.444 113.925 59.952 113.685 59.424C113.445 58.896 113.265 58.308 113.145 57.66C113.169 57.084 113.253 56.364 113.397 55.5C113.565 54.636 113.793 53.748 114.081 52.836C114.633 51.084 115.341 49.344 116.205 47.616C117.093 45.888 117.945 44.304 118.761 42.864C119.433 43.008 120.033 43.236 120.561 43.548C121.113 43.86 121.689 44.316 122.289 44.916C122.049 45.66 121.677 46.452 121.173 47.292C120.669 48.108 120.141 48.972 119.589 49.884C119.037 50.796 118.533 51.732 118.077 52.692C117.621 53.652 117.321 54.624 117.177 55.608C117.849 54.648 118.641 53.544 119.553 52.296C120.489 51.048 121.437 49.872 122.397 48.768C123.381 47.664 124.353 46.728 125.313 45.96C126.273 45.192 127.137 44.808 127.905 44.808C128.193 44.808 128.505 44.856 128.841 44.952C129.177 45.048 129.489 45.168 129.777 45.312C130.065 45.456 130.305 45.6 130.497 45.744C130.689 45.864 130.797 45.96 130.821 46.032C130.701 46.512 130.413 47.172 129.957 48.012C129.525 48.828 129.057 49.692 128.553 50.604C128.049 51.516 127.581 52.404 127.149 53.268C126.717 54.108 126.465 54.78 126.393 55.284C127.569 53.676 128.673 52.224 129.705 50.928C130.737 49.608 131.709 48.48 132.621 47.544C133.533 46.608 134.373 45.888 135.141 45.384C135.933 44.88 136.677 44.628 137.373 44.628C137.853 44.628 138.297 44.76 138.705 45.024C139.137 45.264 139.437 45.624 139.605 46.104C139.389 46.824 139.029 47.688 138.525 48.696C138.045 49.704 137.553 50.772 137.049 51.9C136.545 53.004 136.089 54.096 135.681 55.176C135.297 56.256 135.105 57.228 135.105 58.092C135.105 58.596 135.177 58.932 135.321 59.1C135.465 59.244 135.669 59.316 135.933 59.316C136.221 59.316 136.485 59.268 136.725 59.172C136.989 59.052 137.181 58.992 137.301 58.992C137.445 59.088 137.529 59.208 137.553 59.352C137.577 59.496 137.589 59.628 137.589 59.748C137.109 60.132 136.617 60.444 136.113 60.684C135.609 60.948 135.045 61.08 134.421 61.08C133.845 61.08 133.365 60.984 132.981 60.792C132.621 60.6 132.321 60.336 132.081 60C131.841 59.664 131.673 59.28 131.577 58.848C131.481 58.416 131.433 57.948 131.433 57.444C131.433 56.628 131.541 55.824 131.757 55.032C131.973 54.216 132.225 53.448 132.513 52.728C132.825 51.984 133.149 51.3 133.485 50.676C133.821 50.028 134.109 49.452 134.349 48.948ZM145.316 61.26C143.948 61.116 142.856 60.516 142.04 59.46C141.224 58.404 140.816 57.06 140.816 55.428C140.816 54.468 140.96 53.472 141.248 52.44C141.536 51.408 141.944 50.412 142.472 49.452C143 48.468 143.624 47.544 144.344 46.68C145.064 45.816 145.844 45.072 146.684 44.448C148.004 43.464 149.24 42.972 150.392 42.972C151.16 43.38 151.916 44.232 152.66 45.528C152.78 45.528 152.888 45.528 152.984 45.528C153.08 45.504 153.188 45.492 153.308 45.492C154.58 45.492 155.216 46.62 155.216 48.876C155.216 50.388 154.964 51.828 154.46 53.196C153.98 54.54 153.296 55.764 152.408 56.868C151.544 57.972 150.5 58.908 149.276 59.676C148.076 60.42 146.756 60.948 145.316 61.26ZM147.152 49.92C146.744 50.472 146.36 51.072 146 51.72C145.64 52.368 145.328 53.028 145.064 53.7C144.8 54.348 144.596 54.984 144.452 55.608C144.308 56.208 144.236 56.748 144.236 57.228C144.236 57.804 144.332 58.356 144.524 58.884C144.716 59.412 144.932 59.712 145.172 59.784C146.252 59.544 147.236 59.1 148.124 58.452C149.036 57.78 149.816 56.952 150.464 55.968C151.136 54.984 151.652 53.868 152.012 52.62C152.396 51.372 152.588 50.04 152.588 48.624C152.588 48 152.552 47.508 152.48 47.148C152.408 46.788 152.288 46.476 152.12 46.212C151.064 46.524 150.116 47.028 149.276 47.724C148.46 48.42 147.752 49.152 147.152 49.92ZM164.807 43.188C165.287 43.188 165.839 43.332 166.463 43.62C167.087 43.908 167.639 44.28 168.119 44.736C167.999 43.776 167.843 42.876 167.651 42.036C167.483 41.172 167.219 40.284 166.859 39.372C166.523 38.46 166.067 37.464 165.491 36.384C164.915 35.304 164.195 34.068 163.331 32.676C163.403 32.46 163.559 32.208 163.799 31.92C164.063 31.632 164.351 31.368 164.663 31.128C164.999 30.864 165.335 30.636 165.671 30.444C166.031 30.252 166.367 30.132 166.679 30.084C167.351 30.828 167.987 31.764 168.587 32.892C169.187 33.996 169.715 35.196 170.171 36.492C170.627 37.764 170.975 39.084 171.215 40.452C171.479 41.82 171.611 43.128 171.611 44.376C171.611 45.624 171.467 46.908 171.179 48.228C170.915 49.548 170.531 50.844 170.027 52.116C169.547 53.364 168.983 54.552 168.335 55.68C167.687 56.808 166.979 57.816 166.211 58.704C165.467 59.592 164.687 60.312 163.871 60.864C163.055 61.44 162.239 61.8 161.423 61.944C159.767 61.752 158.495 61.212 157.607 60.324C156.743 59.46 156.311 58.26 156.311 56.724C156.311 55.908 156.431 55.02 156.671 54.06C156.935 53.1 157.271 52.152 157.679 51.216C158.111 50.256 158.603 49.332 159.155 48.444C159.731 47.532 160.331 46.716 160.955 45.996C161.603 45.276 162.251 44.664 162.899 44.16C163.547 43.656 164.183 43.332 164.807 43.188ZM161.135 60.504C161.975 60.216 162.815 59.58 163.655 58.596C164.495 57.612 165.251 56.46 165.923 55.14C166.595 53.796 167.135 52.368 167.543 50.856C167.975 49.32 168.191 47.844 168.191 46.428C168.191 46.02 168.191 45.768 168.191 45.672C168.191 45.576 168.179 45.48 168.155 45.384C167.579 45.624 166.967 46.032 166.319 46.608C165.671 47.184 165.023 47.856 164.375 48.624C163.727 49.368 163.115 50.184 162.539 51.072C161.963 51.96 161.447 52.848 160.991 53.736C160.535 54.624 160.175 55.476 159.911 56.292C159.647 57.108 159.515 57.828 159.515 58.452C159.515 59.652 160.055 60.336 161.135 60.504ZM184.953 45.456C185.193 45.456 185.469 45.504 185.781 45.6C186.117 45.672 186.417 45.78 186.681 45.924C186.945 46.044 187.161 46.176 187.329 46.32C187.521 46.464 187.617 46.596 187.617 46.716C187.137 47.724 186.693 48.744 186.285 49.776C185.877 50.784 185.529 51.756 185.241 52.692C184.953 53.628 184.725 54.504 184.557 55.32C184.413 56.136 184.341 56.844 184.341 57.444C184.341 58.116 184.413 58.68 184.557 59.136C184.701 59.568 184.941 59.88 185.277 60.072C184.989 60.264 184.617 60.42 184.161 60.54C183.705 60.66 183.297 60.72 182.937 60.72C181.641 60.72 180.993 59.832 180.993 58.056C180.993 56.688 181.449 54.816 182.361 52.44C181.881 53.544 181.329 54.588 180.705 55.572C180.081 56.532 179.445 57.384 178.797 58.128C178.149 58.872 177.489 59.484 176.817 59.964C176.169 60.42 175.569 60.696 175.017 60.792C174.129 60.744 173.409 60.324 172.857 59.532C172.305 58.716 172.029 57.684 172.029 56.436C172.029 55.092 172.317 53.676 172.893 52.188C173.469 50.7 174.201 49.32 175.089 48.048C176.001 46.776 176.985 45.72 178.041 44.88C179.097 44.016 180.117 43.56 181.101 43.512C181.341 43.584 181.605 43.728 181.893 43.944C182.205 44.16 182.493 44.412 182.757 44.7C183.045 44.988 183.285 45.288 183.477 45.6C183.669 45.888 183.777 46.14 183.801 46.356C182.841 46.5 181.845 46.968 180.813 47.76C179.805 48.552 178.881 49.512 178.041 50.64C177.225 51.744 176.553 52.932 176.025 54.204C175.497 55.476 175.233 56.664 175.233 57.768C175.233 58.224 175.401 58.512 175.737 58.632C176.433 58.488 177.237 57.9 178.149 56.868C179.061 55.812 180.165 54.192 181.461 52.008C181.701 51.576 181.965 51.096 182.253 50.568C182.565 50.04 182.877 49.488 183.189 48.912C183.501 48.336 183.801 47.76 184.089 47.184C184.401 46.584 184.689 46.008 184.953 45.456Z"
              fill="white" />
            <path
              d="M16.0831 22.05V23.52C13.9365 23.52 12.5831 23.8 12.0231 24.36L22.7331 53.69L33.0231 24.78C32.5565 23.94 31.1098 23.52 28.6831 23.52V22.05H40.1631V23.52C37.5498 23.52 36.1265 23.8933 35.8931 24.64L22.1731 63H18.8131L5.23313 24.99C4.85979 24.01 3.36646 23.52 0.753125 23.52L0.753125 22.05H16.0831ZM42.4693 63V61.53C44.9893 61.53 46.4593 61.0633 46.8793 60.13V24.92C46.4593 23.9867 44.9893 23.52 42.4693 23.52V22.05H57.7293V23.52C55.2093 23.52 53.7393 23.9867 53.3193 24.92V60.62H69.2793C70.446 60.1067 71.496 58.6367 72.4293 56.21H73.8293L72.1493 63H42.4693ZM84.1007 22.05V23.52C81.954 23.52 80.6007 23.8 80.0407 24.36L90.7507 53.69L101.041 24.78C100.574 23.94 99.1274 23.52 96.7007 23.52V22.05H108.181V23.52C105.567 23.52 104.144 23.8933 103.911 24.64L90.1907 63H86.8307L73.2507 24.99C72.8774 24.01 71.384 23.52 68.7707 23.52V22.05H84.1007Z"
              fill="#DA9405" />
          </svg><p> ДИТЯЧИЙ | ПІДЛІДКОВИЙ ОДЯГ <br/>
            <!-- <span style="font-size: 12px;">{{{title}}}</span>  -->
          </p></a>
        </div>

          <div class="header-btn">
            <a href="/products" class="header-btn__search">
				<!-- <svg
					fill="#000000"
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					width="24"
					height="24"
					viewBox="0,0,256,256"
				>
					<g
					fill-rule="nonzero"
					stroke="none"
					stroke-width="1"                                 
					stroke-linecap="butt"
					stroke-linejoin="miter"
					stroke-miterlimit="10"
					stroke-dasharray=""
					stroke-dashoffset="0"
					font-family="none"
					font-weight="none"
					font-size="none"
					text-anchor="none"
					style="mix-blend-mode: normal"
					>
					<g transform="translate(0,256) scale(0.26667,0.26667)">
						<path
						d="M784,-120l-252,-252c-20,16 -43,28.66667 -69,38c-26,9.33333 -53.66667,14 -83,14c-72.66667,0 -134.16667,-25.16667 -184.5,-75.5c-50.33333,-50.33333 -75.5,-111.83333 -75.5,-184.5c0,-72.66667 25.16667,-134.16667 75.5,-184.5c50.33333,-50.33333 111.83333,-75.5 184.5,-75.5c72.66667,0 134.16667,25.16667 184.5,75.5c50.33333,50.33333 75.5,111.83333 75.5,184.5c0,29.33333 -4.66667,57 -14,83c-9.33333,26 -22,49 -38,69l252,252zM380,-400c50,0 92.5,-17.5 127.5,-52.5c35,-35 52.5,-77.5 52.5,-127.5c0,-50 -17.5,-92.5 -52.5,-127.5c-35,-35 -77.5,-52.5 -127.5,-52.5c-50,0 -92.5,17.5 -127.5,52.5c-35,35 -52.5,77.5 -52.5,127.5c0,50 17.5,92.5 52.5,127.5c35,35 77.5,52.5 127.5,52.5z"
						></path>
					</g>
					</g>
				</svg> -->
            </a>
            <a id="cart" href="/cart" class="header-btn__basket">
              <svg
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path
                  d="M240-80q-33 0-56.5-23.5T160-160v-480q0-33 23.5-56.5T240-720h80q0-66 47-113t113-47q66 0 113 47t47 113h80q33 0 56.5 23.5T800-640v480q0 33-23.5 56.5T720-80H240Zm0-80h480v-480h-80v80q0 17-11.5 28.5T600-520q-17 0-28.5-11.5T560-560v-80H400v80q0 17-11.5 28.5T360-520q-17 0-28.5-11.5T320-560v-80h-80v480Zm160-560h160q0-33-23.5-56.5T480-800q-33 0-56.5 23.5T400-720ZM240-160v-480 480Z"
                />
              </svg>
              <div class="header-btn__basket-quantuty">{{{order.products.length || 0}}}</div>
            </a>
			<div id="template-cart" style="display: none;">
				<svg
					fill="white"
					xmlns="http://www.w3.org/2000/svg"
					height="24"
					viewBox="0 -960 960 960"
					width="24"
				>
					<path
					d="M240-80q-33 0-56.5-23.5T160-160v-480q0-33 23.5-56.5T240-720h80q0-66 47-113t113-47q66 0 113 47t47 113h80q33 0 56.5 23.5T800-640v480q0 33-23.5 56.5T720-80H240Zm0-80h480v-480h-80v80q0 17-11.5 28.5T600-520q-17 0-28.5-11.5T560-560v-80H400v80q0 17-11.5 28.5T360-520q-17 0-28.5-11.5T320-560v-80h-80v480Zm160-560h160q0-33-23.5-56.5T480-800q-33 0-56.5 23.5T400-720ZM240-160v-480 480Z"
					/>
				</svg>
				<div class="header-btn__basket-quantuty">{counter}</div>
			</div>
      <div class="header-btn">
        <a href="/auth" class="header-btn__search" id="icon_profile">
            <svg fill="white" height="800px" width="800px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-20.48 -20.48 552.96 552.96" xml:space="preserve" stroke="white" stroke-width="9.728">
            <g id="SVGRepo_bgCarrier" stroke-width="0"/>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
            <g id="SVGRepo_iconCarrier"> <g> <g> <path d="M256,0c-65.733,0-119.211,53.479-119.211,119.211S190.267,238.423,256,238.423s119.211-53.479,119.211-119.211 S321.733,0,256,0z M256,218.024c-54.486,0-98.813-44.328-98.813-98.813S201.515,20.398,256,20.398s98.813,44.328,98.813,98.813 S310.485,218.024,256,218.024z"/> </g> </g> <g> <g> <path d="M426.272,331.529c-45.48-45.48-105.952-70.529-170.272-70.529c-64.32,0-124.791,25.047-170.273,70.529 c-45.48,45.48-70.529,105.952-70.529,170.272c0,5.632,4.566,10.199,10.199,10.199h461.204c5.632,0,10.199-4.567,10.199-10.199 C496.801,437.482,471.752,377.01,426.272,331.529z M35.831,491.602C41.179,374.789,137.889,281.398,256,281.398 s214.821,93.391,220.17,210.204H35.831z"/> </g> </g> <g> <g> <path d="M182.644,457.944H66.295c-5.633,0-10.199,4.567-10.199,10.199s4.566,10.199,10.199,10.199h116.349 c5.633,0,10.199-4.567,10.199-10.199S188.277,457.944,182.644,457.944z"/> </g> </g> <g> <g> <path d="M225.621,457.944h-7.337c-5.633,0-10.199,4.567-10.199,10.199s4.566,10.199,10.199,10.199h7.337 c5.633,0,10.199-4.567,10.199-10.199S231.254,457.944,225.621,457.944z"/> </g> </g> </g>
  </svg>
        </a>
      </div>
          </div>
        </div>
      </header>
      <div class="menu-main__wrapper">
              <nav class="navbar navbar-expand-lg" style="background-color: #ffffff;">
                <div class="container-fluid" style="background-color: #ffffff; display: flex; justify-content: flex-end;">
                  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span><img src="/vlv/img/icons/menu.png" width="25px"></span>
                  </button>
                  <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav">
                        <div class="dropdown"> 
                          {% for tag in tags %}
                          <div class="dropdown-hover">
                          <a class="button-menu" data-bs-toggle="dropdown" aria-expanded="false">
                            {{{tag.name}}}
                          </a>
                          <ul class="dropdown-menu menu-drop1">
                            {{{'/vlv/components/menu'|c({tags: tag.allTags}|safe)}}}
                           </ul>
                          </div>
                          {% endfor %}
                        </div>

                    </ul>
                  </div>
                </div>
              </nav>
      </div>

	  <div class="container cloth-container">
  <div class="row">
    <div class="col-md-3">
      <div class="sidebar">
        <h3>Фільтрувати за</h3>
        <ul>
          <li>
            <a href="#" class="toggle-category" id="gender">Стать</a>
            <ul>
              {% for gender in genders %}
              <li>
                <label>
                  <input type="checkbox" name="{{{gender}}}" class="filter-checkbox" data-category="gender">
                  {% if gender == 'boy' %}
                  Хлопчики
                  {% endif %}
                  {% if gender == 'girl' %}
                  Дівчатка
                  {% endif %}
                  {% if gender == 'unisex' %}
                  Унісекс
                  {% endif %}
                </label>
              </li>
              {% endfor %}
            </ul>
          </li>
          <li>
            <a href="#" class="toggle-category" id="age">Вік</a>
            <ul>
              {% for age in ages %}
              <li>
                <label>
                  <input type="checkbox" name="{{{age.value}}}" class="filter-checkbox" data-category="age">
                  {{{age.title}}}
                </label>
              </li>
              {% endfor %}
            </ul>
          </li>
          <li>
            <a href="#" class="toggle-category" id="season">Сезон</a>
            <ul>
              {% for season in seasons %}
              <li>
                <label>
                  <input type="checkbox" name="{{{season}}}" class="filter-checkbox" data-category="season">
                  {{{season}}}
                </label>
              </li>
              {% endfor %}
            </ul>
          </li>
          <li>
            <a href="#" class="toggle-category" id="price">Ціна</a>
            <div class="container mt-5">
              <div class="d-flex justify-content-between">
                <input type="number" id="price-min" min="0" max="99999" value="0" class="form-control w-25">
                <span class="mx-2">-</span>
                <input type="number" id="price-max" min="0" max="99999" value="99999" class="form-control w-25">
              </div>
              <div class="slider-container position-relative">
                <div class="slider-track"></div>
                <input type="range" class="slider" id="slider-min" min="0" max="99999" step="10" value="0">
                <input type="range" class="slider" id="slider-max" min="0" max="99999" step="10" value="99999">
                <div class="slider-values">
                  <span class="slider-min-value">₴0</span>
                  <span class="slider-max-value">₴99999</span>
                </div>
                <div class="slider-steps">
                  <span class="step" style="left: 20%;">|</span>
                  <span class="step" style="left: 40%;">|</span>
                  <span class="step" style="left: 60%;">|</span>
                  <span class="step" style="left: 80%;">|</span>
                </div>
              </div>
              <button class="btn btn-primary mt-3" id="reset-button">Очистити</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-md-8">
      <div class="cloth__list">
        {% for product in products %}
        <a href="/product/{{{product._id|string}}}" class="cloth__item cloth__item-products" data-modal-id="modal">
          <img src="{{{product.thumb}}}" alt="{{{product.name}}}" />
          <div class="cloth__item-title">{{{product.name}}}</div>
          <div class="cloth__item-price">{{{product.price}}} <span>{{{currency}}}</span></div>
        </a>
        {% endfor %}
      </div>
    </div>
  </div>
</div>

<script type="module">
  import Dom from "/api/wjst/dom";
  document.addEventListener('DOMContentLoaded', function () {
    var toggles = document.querySelectorAll('.toggle-category');
    toggles.forEach(function (toggle) {
      toggle.addEventListener('click', function (event) {
        event.preventDefault();
        var parentLi = this.parentElement;
        if (parentLi.classList.contains('active')) {
          parentLi.classList.remove('active');
        } else {
          parentLi.classList.add('active');
        }
      });
    });

    const priceMinInput = Dom.element('price-min');
    const priceMaxInput = Dom.element('price-max');
    const sliderMin = Dom.element('slider-min');
    const sliderMax = Dom.element('slider-max');

    function updateSlider() {
      const minVal = parseFloat(sliderMin.value);
      const maxVal = parseFloat(sliderMax.value);

      if (minVal > maxVal) {
        sliderMin.value = maxVal;
        sliderMax.value = minVal;
      }

      priceMinInput.value = sliderMin.value;
      priceMaxInput.value = sliderMax.value;
    }
    sliderMin.addEventListener('input', updateSlider);
    sliderMax.addEventListener('input', updateSlider);
    sliderMin.addEventListener('change', updateFilters);
    sliderMax.addEventListener('change', updateFilters);
    priceMinInput.addEventListener('blur', function () {
      sliderMin.value = priceMinInput.value;
      updateSlider();
      updateFilters();
    });

    priceMaxInput.addEventListener('blur', function () {
      sliderMax.value = priceMaxInput.value;
      updateSlider();
      updateFilters();
    });

    function resetSlider() {
      priceMinInput.value = 0;
      priceMaxInput.value = 99999;
      sliderMin.value = 0;
      sliderMax.value = 99999;
      updateSlider();
      updateFilters();
    }
    Dom.click("reset-button", () => resetSlider());

    document.querySelectorAll('.filter-checkbox').forEach(checkbox => {
      checkbox.addEventListener('change', function () {
        updateFilters();
      });
    });


    function updateFilters() {
      let url = new URL(window.location.href);
      let params = new URLSearchParams(url.search);

      const filterCategories = document.querySelectorAll('.toggle-category');
      filterCategories.forEach(category => {
        params.delete(category.id);
      });

      const filterValues = {};

      document.querySelectorAll('.filter-checkbox').forEach(checkbox => {
        if (checkbox.checked) {
          const category = checkbox.getAttribute('data-category');
          if (!filterValues[category]) {
            filterValues[category] = [];
          }
          filterValues[category].push(checkbox.name);
        }
      });

      const minPrice = Dom.element('price-min').value;
      const maxPrice = Dom.element('price-max').value;
      if (minPrice !== '' && maxPrice !== '') {
        filterValues['price'] = [minPrice, maxPrice];
      }

      for (const [category, values] of Object.entries(filterValues)) {
        if (values.length > 0) {
          params.set(category, values.join(','));
        }
      }
      url.search = params.toString();
      window.history.replaceState(null, null, url.toString());
      location.reload();
    }

    function initializeFilters() {
      let url = new URL(window.location.href);
      let params = new URLSearchParams(url.search);
      let categoriesWithEnabledFilters = new Set();

      params.forEach((value, key) => {
        let values = value.split(',');
        values.forEach(val => {
          if (key === 'price') {
            Dom.element('price-min').value = values[0];
            Dom.element('price-max').value = values[1];
            Dom.element('slider-min').value = values[0];
            Dom.element('slider-max').value = values[1];
          } else {
            let checkbox = document.querySelector(`.filter-checkbox[data-category="${key}"][name="${val}"]`);
            if (checkbox) {
              checkbox.checked = true;
              categoriesWithEnabledFilters.add(key);
            }
          }
        });
      });

      categoriesWithEnabledFilters.forEach(category => {
        let categoryElement = document.getElementById(category);
        if (categoryElement) {
          categoryElement.parentElement.classList.add('active');
        }
      });
    }

    initializeFilters();
  });
</script>
      <footer class="footer">
        <div class="footer-top">
          <div class="container footer-top__container">

			{% if top_articles.length %}
            <div class="footer-top__item">
              <div class="footer-top__title">Новини</div>
              <ul class="footer-top__ul">
				{% for article in top_articles %}
                <li class="footer-top__li">
					<a href="/article/{{{article._id}}}">{{{article.name}}}</a>
				</li>
				{% endfor %}
              </ul>
            </div>
			{% endif %}

      {% if top_contents.length %}
            <div class="footer-top__item">
              <div class="footer-top__title">Споживачам</div>
              <ul class="footer-top__ul">
				{% for content in top_contents %}
                <li class="footer-top__li">
					<a href="{{{content.url}}}">{{{content.name}}}</a>
				</li>
				{% endfor %}
              </ul>
            </div>
          {% endif %}
            <div class="footer-top__item">
              <div class="footer-top__title">Наші дані</div>
              <ul class="footer-top__ul">
                <li class="footer-top__li">{{{variables.address}}}</li>
                <li class="footer-top__li">{{{variables.phone}}}</li>
                <li class="footer-top__li">
                  <a href="{{{variables.email}}}">{{{variables.email}}}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <div class="container footer-bottom__container">
            <div class="footer-bottom__soc">
              {% if variables.link_instagram %}
              <a
                class="footer-bottom__soc-img"
                href="{{{variables.link_instagram}}}"
              >
                <svg
                  width="800px"
                  height="800px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                    fill="$white"
                  />
                  <path
                    d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z"
                    fill="$white"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z"
                    fill="$white"
                  />
                </svg>
              </a>
			  {% endif %}
              {% if variables.link_facebook %}
			  <a class="footer-bottom__soc-img" href="{{{variables.link_facebook}}}">
                <svg
                  fill="#000000"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  width="800px"
                  height="800px"
                  viewBox="0 0 512 512"
                  xml:space="preserve"
                >
                  <g id="7935ec95c421cee6d86eb22ecd11b7e3">
                    <path
                      style="display: inline"
                      d="M283.122,122.174c0,5.24,0,22.319,0,46.583h83.424l-9.045,74.367h-74.379
								c0,114.688,0,268.375,0,268.375h-98.726c0,0,0-151.653,0-268.375h-51.443v-74.367h51.443c0-29.492,0-50.463,0-56.302
								c0-27.82-2.096-41.02,9.725-62.578C205.948,28.32,239.308-0.174,297.007,0.512c57.713,0.711,82.04,6.263,82.04,6.263
								l-12.501,79.257c0,0-36.853-9.731-54.942-6.263C293.539,83.238,283.122,94.366,283.122,122.174z"
                    ></path>
                  </g>
                </svg>
              </a>
			  {% endif %}
            </div>
            <div class="footer-bottom__copyright">
              <p>&copy; 2024 - 
                <svg width="80" height="45" viewBox="0 0 188 85" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M134.349 48.948C133.965 48.972 133.497 49.224 132.945 49.704C132.393 50.16 131.793 50.76 131.145 51.504C130.521 52.224 129.861 53.028 129.165 53.916C128.493 54.804 127.833 55.692 127.185 56.58C126.561 57.444 125.973 58.26 125.421 59.028C124.869 59.796 124.401 60.408 124.017 60.864C123.489 60.648 123.033 60.336 122.649 59.928C122.265 59.496 121.989 58.968 121.821 58.344C121.941 57.6 122.109 56.832 122.325 56.04C122.541 55.224 122.817 54.384 123.153 53.52C123.513 52.656 123.945 51.756 124.449 50.82C124.977 49.86 125.613 48.852 126.357 47.796C125.997 47.82 125.505 48.084 124.881 48.588C124.257 49.068 123.585 49.704 122.865 50.496C122.145 51.264 121.401 52.14 120.633 53.124C119.865 54.084 119.145 55.032 118.473 55.968C117.585 57.216 116.841 58.308 116.241 59.244C115.665 60.18 115.245 60.732 114.981 60.9C114.357 60.444 113.925 59.952 113.685 59.424C113.445 58.896 113.265 58.308 113.145 57.66C113.169 57.084 113.253 56.364 113.397 55.5C113.565 54.636 113.793 53.748 114.081 52.836C114.633 51.084 115.341 49.344 116.205 47.616C117.093 45.888 117.945 44.304 118.761 42.864C119.433 43.008 120.033 43.236 120.561 43.548C121.113 43.86 121.689 44.316 122.289 44.916C122.049 45.66 121.677 46.452 121.173 47.292C120.669 48.108 120.141 48.972 119.589 49.884C119.037 50.796 118.533 51.732 118.077 52.692C117.621 53.652 117.321 54.624 117.177 55.608C117.849 54.648 118.641 53.544 119.553 52.296C120.489 51.048 121.437 49.872 122.397 48.768C123.381 47.664 124.353 46.728 125.313 45.96C126.273 45.192 127.137 44.808 127.905 44.808C128.193 44.808 128.505 44.856 128.841 44.952C129.177 45.048 129.489 45.168 129.777 45.312C130.065 45.456 130.305 45.6 130.497 45.744C130.689 45.864 130.797 45.96 130.821 46.032C130.701 46.512 130.413 47.172 129.957 48.012C129.525 48.828 129.057 49.692 128.553 50.604C128.049 51.516 127.581 52.404 127.149 53.268C126.717 54.108 126.465 54.78 126.393 55.284C127.569 53.676 128.673 52.224 129.705 50.928C130.737 49.608 131.709 48.48 132.621 47.544C133.533 46.608 134.373 45.888 135.141 45.384C135.933 44.88 136.677 44.628 137.373 44.628C137.853 44.628 138.297 44.76 138.705 45.024C139.137 45.264 139.437 45.624 139.605 46.104C139.389 46.824 139.029 47.688 138.525 48.696C138.045 49.704 137.553 50.772 137.049 51.9C136.545 53.004 136.089 54.096 135.681 55.176C135.297 56.256 135.105 57.228 135.105 58.092C135.105 58.596 135.177 58.932 135.321 59.1C135.465 59.244 135.669 59.316 135.933 59.316C136.221 59.316 136.485 59.268 136.725 59.172C136.989 59.052 137.181 58.992 137.301 58.992C137.445 59.088 137.529 59.208 137.553 59.352C137.577 59.496 137.589 59.628 137.589 59.748C137.109 60.132 136.617 60.444 136.113 60.684C135.609 60.948 135.045 61.08 134.421 61.08C133.845 61.08 133.365 60.984 132.981 60.792C132.621 60.6 132.321 60.336 132.081 60C131.841 59.664 131.673 59.28 131.577 58.848C131.481 58.416 131.433 57.948 131.433 57.444C131.433 56.628 131.541 55.824 131.757 55.032C131.973 54.216 132.225 53.448 132.513 52.728C132.825 51.984 133.149 51.3 133.485 50.676C133.821 50.028 134.109 49.452 134.349 48.948ZM145.316 61.26C143.948 61.116 142.856 60.516 142.04 59.46C141.224 58.404 140.816 57.06 140.816 55.428C140.816 54.468 140.96 53.472 141.248 52.44C141.536 51.408 141.944 50.412 142.472 49.452C143 48.468 143.624 47.544 144.344 46.68C145.064 45.816 145.844 45.072 146.684 44.448C148.004 43.464 149.24 42.972 150.392 42.972C151.16 43.38 151.916 44.232 152.66 45.528C152.78 45.528 152.888 45.528 152.984 45.528C153.08 45.504 153.188 45.492 153.308 45.492C154.58 45.492 155.216 46.62 155.216 48.876C155.216 50.388 154.964 51.828 154.46 53.196C153.98 54.54 153.296 55.764 152.408 56.868C151.544 57.972 150.5 58.908 149.276 59.676C148.076 60.42 146.756 60.948 145.316 61.26ZM147.152 49.92C146.744 50.472 146.36 51.072 146 51.72C145.64 52.368 145.328 53.028 145.064 53.7C144.8 54.348 144.596 54.984 144.452 55.608C144.308 56.208 144.236 56.748 144.236 57.228C144.236 57.804 144.332 58.356 144.524 58.884C144.716 59.412 144.932 59.712 145.172 59.784C146.252 59.544 147.236 59.1 148.124 58.452C149.036 57.78 149.816 56.952 150.464 55.968C151.136 54.984 151.652 53.868 152.012 52.62C152.396 51.372 152.588 50.04 152.588 48.624C152.588 48 152.552 47.508 152.48 47.148C152.408 46.788 152.288 46.476 152.12 46.212C151.064 46.524 150.116 47.028 149.276 47.724C148.46 48.42 147.752 49.152 147.152 49.92ZM164.807 43.188C165.287 43.188 165.839 43.332 166.463 43.62C167.087 43.908 167.639 44.28 168.119 44.736C167.999 43.776 167.843 42.876 167.651 42.036C167.483 41.172 167.219 40.284 166.859 39.372C166.523 38.46 166.067 37.464 165.491 36.384C164.915 35.304 164.195 34.068 163.331 32.676C163.403 32.46 163.559 32.208 163.799 31.92C164.063 31.632 164.351 31.368 164.663 31.128C164.999 30.864 165.335 30.636 165.671 30.444C166.031 30.252 166.367 30.132 166.679 30.084C167.351 30.828 167.987 31.764 168.587 32.892C169.187 33.996 169.715 35.196 170.171 36.492C170.627 37.764 170.975 39.084 171.215 40.452C171.479 41.82 171.611 43.128 171.611 44.376C171.611 45.624 171.467 46.908 171.179 48.228C170.915 49.548 170.531 50.844 170.027 52.116C169.547 53.364 168.983 54.552 168.335 55.68C167.687 56.808 166.979 57.816 166.211 58.704C165.467 59.592 164.687 60.312 163.871 60.864C163.055 61.44 162.239 61.8 161.423 61.944C159.767 61.752 158.495 61.212 157.607 60.324C156.743 59.46 156.311 58.26 156.311 56.724C156.311 55.908 156.431 55.02 156.671 54.06C156.935 53.1 157.271 52.152 157.679 51.216C158.111 50.256 158.603 49.332 159.155 48.444C159.731 47.532 160.331 46.716 160.955 45.996C161.603 45.276 162.251 44.664 162.899 44.16C163.547 43.656 164.183 43.332 164.807 43.188ZM161.135 60.504C161.975 60.216 162.815 59.58 163.655 58.596C164.495 57.612 165.251 56.46 165.923 55.14C166.595 53.796 167.135 52.368 167.543 50.856C167.975 49.32 168.191 47.844 168.191 46.428C168.191 46.02 168.191 45.768 168.191 45.672C168.191 45.576 168.179 45.48 168.155 45.384C167.579 45.624 166.967 46.032 166.319 46.608C165.671 47.184 165.023 47.856 164.375 48.624C163.727 49.368 163.115 50.184 162.539 51.072C161.963 51.96 161.447 52.848 160.991 53.736C160.535 54.624 160.175 55.476 159.911 56.292C159.647 57.108 159.515 57.828 159.515 58.452C159.515 59.652 160.055 60.336 161.135 60.504ZM184.953 45.456C185.193 45.456 185.469 45.504 185.781 45.6C186.117 45.672 186.417 45.78 186.681 45.924C186.945 46.044 187.161 46.176 187.329 46.32C187.521 46.464 187.617 46.596 187.617 46.716C187.137 47.724 186.693 48.744 186.285 49.776C185.877 50.784 185.529 51.756 185.241 52.692C184.953 53.628 184.725 54.504 184.557 55.32C184.413 56.136 184.341 56.844 184.341 57.444C184.341 58.116 184.413 58.68 184.557 59.136C184.701 59.568 184.941 59.88 185.277 60.072C184.989 60.264 184.617 60.42 184.161 60.54C183.705 60.66 183.297 60.72 182.937 60.72C181.641 60.72 180.993 59.832 180.993 58.056C180.993 56.688 181.449 54.816 182.361 52.44C181.881 53.544 181.329 54.588 180.705 55.572C180.081 56.532 179.445 57.384 178.797 58.128C178.149 58.872 177.489 59.484 176.817 59.964C176.169 60.42 175.569 60.696 175.017 60.792C174.129 60.744 173.409 60.324 172.857 59.532C172.305 58.716 172.029 57.684 172.029 56.436C172.029 55.092 172.317 53.676 172.893 52.188C173.469 50.7 174.201 49.32 175.089 48.048C176.001 46.776 176.985 45.72 178.041 44.88C179.097 44.016 180.117 43.56 181.101 43.512C181.341 43.584 181.605 43.728 181.893 43.944C182.205 44.16 182.493 44.412 182.757 44.7C183.045 44.988 183.285 45.288 183.477 45.6C183.669 45.888 183.777 46.14 183.801 46.356C182.841 46.5 181.845 46.968 180.813 47.76C179.805 48.552 178.881 49.512 178.041 50.64C177.225 51.744 176.553 52.932 176.025 54.204C175.497 55.476 175.233 56.664 175.233 57.768C175.233 58.224 175.401 58.512 175.737 58.632C176.433 58.488 177.237 57.9 178.149 56.868C179.061 55.812 180.165 54.192 181.461 52.008C181.701 51.576 181.965 51.096 182.253 50.568C182.565 50.04 182.877 49.488 183.189 48.912C183.501 48.336 183.801 47.76 184.089 47.184C184.401 46.584 184.689 46.008 184.953 45.456Z"
                    fill="white" />
                  <path
                    d="M16.0831 22.05V23.52C13.9365 23.52 12.5831 23.8 12.0231 24.36L22.7331 53.69L33.0231 24.78C32.5565 23.94 31.1098 23.52 28.6831 23.52V22.05H40.1631V23.52C37.5498 23.52 36.1265 23.8933 35.8931 24.64L22.1731 63H18.8131L5.23313 24.99C4.85979 24.01 3.36646 23.52 0.753125 23.52L0.753125 22.05H16.0831ZM42.4693 63V61.53C44.9893 61.53 46.4593 61.0633 46.8793 60.13V24.92C46.4593 23.9867 44.9893 23.52 42.4693 23.52V22.05H57.7293V23.52C55.2093 23.52 53.7393 23.9867 53.3193 24.92V60.62H69.2793C70.446 60.1067 71.496 58.6367 72.4293 56.21H73.8293L72.1493 63H42.4693ZM84.1007 22.05V23.52C81.954 23.52 80.6007 23.8 80.0407 24.36L90.7507 53.69L101.041 24.78C100.574 23.94 99.1274 23.52 96.7007 23.52V22.05H108.181V23.52C105.567 23.52 104.144 23.8933 103.911 24.64L90.1907 63H86.8307L73.2507 24.99C72.8774 24.01 71.384 23.52 68.7707 23.52V22.05H84.1007Z"
                    fill="#DA9405" />
                </svg>. </p>
			  <!-- All rights reserved. -->
            </div>
          </div>
        </div>
      </footer>
      <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
      <script src="/vlv/js/index.js"></script>
      <script src="/vlv/js/swiper.js"></script>
      <script src="/vlv/js/product.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    </div>
  </body>
</html>
<script type="module">
  import Dom from "/api/wjst/dom";
  import Http from '/api/wjst/http';
  
  if (Http.headers['token']){
      Dom.element('icon_profile').href = '/profile';
  }
  </script>
  
