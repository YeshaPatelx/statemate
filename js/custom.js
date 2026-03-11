//   dropdown 

$(function () {

    // helper: find the icon element inside toggle (could be <i> or <svg>)
    function findIcon($toggle) {
        var $i = $toggle.find('i').first();
        if ($i.length) return $i;
        var $svg = $toggle.find('svg').first();
        return $svg.length ? $svg : null;
    }

    // helper: reset icon to "closed" state
    function resetIcon($icon) {
        if (!$icon) return;
        if ($icon.is('i')) {
            $icon.removeClass('fa-chevron-up').addClass('fa-chevron-down');
        } else {
            $icon.css('transform', 'rotate(0deg)');
        }
    }

    // helper: set icon to "open" state
    function openIcon($icon) {
        if (!$icon) return;
        if ($icon.is('i')) {
            $icon.removeClass('fa-chevron-down').addClass('fa-chevron-up');
        } else {
            $icon.css('transform', 'rotate(180deg)');
        }
    }

    // Toggle main dropdown
    $(document).on('click', '.custom-dropdown-toggle', function (e) {
        e.stopPropagation();

        var $root = $(this).closest('.custom-dropdown');

        // close other dropdowns
        $('.custom-dropdown').not($root).each(function () {
            $(this).removeClass('open');
            var otherIcon = findIcon($(this).find('.custom-dropdown-toggle'));
            resetIcon(otherIcon);
        });

        // toggle this dropdown
        $root.toggleClass('open');
        var $icon = findIcon($(this));
        if ($root.hasClass('open')) openIcon($icon);
        else resetIcon($icon);
    });

    // ------------------------------
    // SUBMENU — hover open
    // ------------------------------
    $(document).on('mouseenter', '.custom-dropdown .has-sub', function () {
        $(this).find('.sub-menu').addClass('open-sub');
    });

    $(document).on('mouseleave', '.custom-dropdown .has-sub', function () {
        $(this).find('.sub-menu').removeClass('open-sub');
    });

    // Close when clicking outside
    $(document).on('click', function () {
        $('.custom-dropdown.open').each(function () {
            $(this).removeClass('open');
            var $icon = findIcon($(this).find('.custom-dropdown-toggle'));
            resetIcon($icon);
        });
    });

    // ------------------------------
    // SELECT MAIN ITEM + SUB ITEM
    // ------------------------------
    $(document).on('click', '.custom-dropdown .item, .custom-dropdown .sub-item', function (e) {
        e.stopPropagation();

        var $item = $(this);
        var $root = $item.closest('.custom-dropdown');

        // MAIN DROPDOWN
        var text = "";

        // If item has <h4> (your first dropdown)
        if ($item.find("h4").length) {
            text = $item.find("h4").first().text().trim();
        }
        // If submenu item
        else if ($item.hasClass('sub-item')) {
            text = $item.text().trim();
        }
        // If simple <div class="item" data-value="">
        else if ($item.data("value")) {
            text = $item.data("value").toString().trim();
        }
        // Fallback visible text
        else {
            text = $item.text().trim();
        }

        // SET SELECTED TEXT
        var $display = $root.find('.status-select .text');
        if ($display.length) $display.text(text);
        else $root.find('.custom-dropdown-toggle .text').text(text);

        // SAVE VALUE
        var value = $item.data('value') ? $item.data('value') : text;
        $root.data('selected', value);

        // CLOSE DROPDOWN
        $root.removeClass('open');
        var $icon = findIcon($root.find('.custom-dropdown-toggle'));
        resetIcon($icon);

        // Close submenu also
        $root.find('.sub-menu').removeClass('open-sub');
    });

    // ESC close
    $(document).on('keydown', function (e) {
        if (e.key === 'Escape' || e.key === 'Esc') {
            $('.custom-dropdown.open').each(function () {
                $(this).removeClass('open');
                var $icon = findIcon($(this).find('.custom-dropdown-toggle'));
                resetIcon($icon);
            });
            $('.sub-menu').removeClass('open-sub');
        }
    });

});




// end dropdown
   
$(document).ready(function () {

    $('.menu-container ul > li').click(function (e) {
        e.stopPropagation();

        var $li = $(this);
        var $icon = $li.find('svg');
        var $submenu = $li.find('.sub-menu-data');
        var isOpen = $submenu.is(':visible');

        // Close all other submenus and remove active classes
        $('.menu-container ul > li .sub-menu-data').slideUp(400);
        $('.menu-container ul > li').removeClass('active');
        $('.menu-container ul > li svg').removeClass('rotated');

        // Toggle submenu for clicked li
        if (!isOpen) {
            $submenu.slideDown(400);
            $icon.addClass('rotated');
            $li.addClass('active');   // <-- ADD ACTIVE CLASS
        }
    });

    // Click outside closes all dropdowns
    $('body').click(function () {
        $('.menu-container ul > li .sub-menu-data').slideUp(300);
        $('.menu-container ul > li').removeClass('active'); // remove active
        $('.menu-container ul > li svg').removeClass('rotated');
    });

    $('.menu-container').click(function (e) {
        e.stopPropagation();
    });

});



 jQuery(document).ready(function($) {
    $('.toggle-info').on('click', function() {
      $('.sidebar-nav').toggleClass('sidebar_toggle');
      $('.main-container').toggleClass('main-container-open');
    });
    $('.close-icon-mobile').on('click', function() {
         $('.sidebar-nav').removeClass('sidebar_toggle');
    });
  });

    // $(document).ready(function(){
    //     $('.action-wrapper .action').click(function(){
    //         $('.dropdown-menu-content').toggle();
    //     });
    // });

    $(document).ready(function () {
    $('.action-wrapper .action').click(function (e) {
        e.preventDefault();
        e.stopPropagation();

        // Get the dropdown for the clicked action
        var dropdown = $(this).siblings('.dropdown-menu-content');

        // Close all other dropdowns
        $('.dropdown-menu-content').not(dropdown).hide();

        // Toggle only the clicked one
        dropdown.toggle();
    });

    // Close dropdown when clicking anywhere else on the page
    $(document).click(function () {
        $('.dropdown-menu-content').hide();
    });
});




   
   
   
   
   
   
   const ctx = document.getElementById('userGrowthChart').getContext('2d');

    // Gradient for optional use
    const gradient = ctx.createLinearGradient(0, 0, ctx.canvas.width, 0);
    gradient.addColorStop(0, '#EE4B9E');
    gradient.addColorStop(1, '#7627B5');

    const userGrowthChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Users',
          data: [220, 550, 600, 700, 950, 1020, 1060, 1080, 1090, 1260, 1250, 1400],
          borderColor: '#1e1e1e',
          borderWidth: 1.5,
          pointBackgroundColor: '#c154e8',
          pointBorderColor: '#c154e8',
          pointRadius: 5,
          fill: false,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            min: 200,  
            grid: { color: '#eee' },
            ticks: { color: '#444' }
          },
          x: {
            grid: { display: false },
            ticks: { color: '#444' }
          }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });




    

    const ctx1 = document.getElementById('matchChart').getContext('2d');
    new Chart(ctx1, {
      type: 'doughnut',
      data: {
        labels: ['Total Matches', 'Active Matches', 'Matches With Mutual Likes'],
        datasets: [{
          data: [47, 28, 25],
          backgroundColor: ['#4D1A76', '#EE4B9E', '#E02940'],
          borderWidth: 0,
        }]
      },
      options: {
        cutout: '70%',
        plugins: {
          legend: { display: false },
          tooltip: { enabled: true }
        }
      }
    });


    
// event graph



 

